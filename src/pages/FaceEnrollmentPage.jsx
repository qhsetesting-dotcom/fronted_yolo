import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  AlertTriangle,
  Camera,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  Import,
  Info,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Star,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

import {
  getCameraStreamUrl,
  getFaceRecognitionStreamUrl,
  startFaceRecognition,
  stopFaceRecognition,
  getFaceRecognitionStatus,
  captureFace,
  importFaces,
  getDepartments,
  createDepartment,
  deleteDepartment,
  getRoles,
  createRole,
  deleteRole,
  enrollFacePerson,
} from "../data/api";

import {
  alerts,
  enrollmentStats,
  recognitionStats,
  recentEnrollmentLogs,
} from "../data/faceEnrollmentData";

const DECISION_STYLES = {
  accepted: {
    border: "border-emerald-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500/15",
    label: "Accepted",
  },
  review: {
    border: "border-yellow-400",
    text: "text-yellow-300",
    bg: "bg-yellow-500/15",
    label: "Review",
  },
  rejected: {
    border: "border-red-500",
    text: "text-red-400",
    bg: "bg-red-500/15",
    label: "Rejected",
  },
};

const EMPTY_PERSON_FORM = {
  fullName: "",
  employeeId: "",
  department: "",
  role: "",
  mobile: "",
  email: "",
};

const DRAFT_STORAGE_KEY = "faceEnrollmentDraft";

function readSavedDraft() {
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
}

function toPercent(value, fallback = 0) {
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numberValue)));
}

function normalizeCaptureData(data = {}, source = "camera", fileName = "") {
  const decision =
    data.decision || (data.status === "Blurry" ? "rejected" : "accepted");
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    src: data.image_url,
    status: data.status || data.quality_label || "Review",
    decision,
    approved: decision === "accepted",
    selected: decision !== "rejected",
    isPrimary: false,
    qualityScore: toPercent(data.quality_score),
    visibility: toPercent(data.visibility),
    blurScore: Number(data.blur_score || 0),
    brightness: Number(data.brightness || 0),
    confidence: Number(data.confidence || 0),
    faceCount: Number(data.face_count || 0),
    faceOccupancy: Number(data.face_occupancy || 0),
    pose: data.pose || {},
    checks: data.checks || {},
    reasons: data.reasons || [],
    metrics: data.metrics || {},
    source,
    fileName,
  };
}

function getImageStyle(image) {
  if (image?.isPrimary) return "border-blue-500 ring-1 ring-blue-400";
  if (image?.approved) return "border-emerald-500";
  return DECISION_STYLES[image?.decision]?.border || "border-[#2b3e52]";
}

function StatCard({ item }) {
  const getCardIcon = (title) => {
    const normalizedTitle = title.toLowerCase();
    if (normalizedTitle.includes("total")) return Users;
    if (normalizedTitle.includes("active")) return User;
    if (normalizedTitle.includes("today")) return Calendar;
    if (normalizedTitle.includes("failed")) return ShieldAlert;
    return item.icon;
  };

  const Icon = getCardIcon(item.title);

  return (
    <div className="glass-card flex h-[89.5px] min-w-0 items-center gap-2 overflow-hidden px-2 2xl:gap-3 2xl:px-3">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl 2xl:h-12 2xl:w-12 ${item.color}`}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          title={item.title}
          className="break-words text-[8.5px] font-semibold uppercase leading-tight tracking-wide text-white/70 2xl:text-[10px]"
        >
          {item.title}
        </p>
        <h2
          title={String(item.value)}
          className="mt-1 truncate text-[16px] font-bold leading-none text-white"
        >
          {item.value}
        </h2>
        <p title={item.sub} className="mt-1 truncate text-[10px] text-white/55">
          {item.sub}
        </p>
        <p
          title={`${item.change} ${item.changeText}`}
          className={`mt-1 truncate text-[10px] font-bold leading-none ${item.negative ? "text-red-500" : "text-emerald-400"}`}
        >
          {item.negative ? "↓" : "↑"} {item.change}
          <span className="ml-1 font-medium text-white/50">
            {item.changeText}
          </span>
        </p>
      </div>
    </div>
  );
}

function QualityRow({ label, ok, value = "—" }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_16px_54px] items-center gap-1 text-[9px] leading-5 xl:text-[10px]">
      <span title={label} className="truncate text-white/75">
        {label}
      </span>
      {ok ? (
        <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
      ) : (
        <X size={12} className="shrink-0 text-red-400" />
      )}
      <span title={String(value)} className="truncate text-white/80">
        {value}
      </span>
    </div>
  );
}

function LogCell({ children }) {
  const value = children || "—";
  return (
    <span title={String(value)} className="block truncate">
      {value}
    </span>
  );
}

function LogStatusBadge({ status }) {
  return (
    <span
      title={status}
      className={`inline-block max-w-full truncate rounded px-1.5 py-0.5 text-[8px] font-semibold ${status === "Failed" ? "bg-red-500/15 text-red-400" : "bg-emerald-500/15 text-emerald-400"}`}
    >
      ● {status}
    </span>
  );
}

function FormRow({ label, required, children }) {
  return (
    <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 2xl:grid-cols-[112px_minmax(0,1fr)]">
      <label
        title={label}
        className="truncate text-[10px] text-white/70 2xl:text-[11px]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function StreamImage({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackText,
  imageRef,
}) {
  if (!src) {
    return (
      <div
        className={
          fallbackClassName ||
          "flex h-full w-full items-center justify-center bg-[#050f19] text-[11px] text-white/40"
        }
      >
        {fallbackText || "Select camera from header dropdown"}
      </div>
    );
  }
  return (
    <img
      ref={imageRef}
      key={src}
      src={src}
      alt={alt}
      className={className}
      crossOrigin="anonymous"
    />
  );
}

function ManageListSection({
  title,
  items,
  onAddClick,
  onDeleteClick,
  nameHeader,
  addButtonText,
}) {
  return (
    <section className="flex min-h-0 w-full min-w-0 flex-col rounded-lg border border-[#1b344d] bg-[#061421] p-3">
      <div className="mb-2 flex h-7 shrink-0 items-center justify-between gap-2">
        <h3 className="truncate text-[12px] font-semibold">{title}</h3>
        <button
          onClick={onAddClick}
          className="shrink-0 rounded border border-blue-500 px-2 py-1 text-[10px] text-white hover:bg-blue-600"
        >
          {addButtonText}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-md border border-[#1b344d]">
        <div className="grid h-7 grid-cols-[minmax(0,1fr)_52px] items-center bg-[#082136] px-2 text-[10px] font-semibold text-white/85">
          <span>{nameHeader}</span>
          <span className="text-center">Action</span>
        </div>
        <div className="h-[calc(100%-28px)] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid h-9 grid-cols-[minmax(0,1fr)_52px] items-center border-t border-[#1b344d] px-2 text-[10px] hover:bg-[#0b2238]"
            >
              <span title={item.name} className="truncate font-semibold text-white">
                {item.name}
              </span>
              <div className="flex justify-center">
                <button
                  onClick={() => onDeleteClick(item)}
                  className="grid h-6 w-6 place-items-center rounded border border-[#2b3e52] text-red-400 hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopupModal({
  title = "Paperless Management System States",
  children,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
      <div className="w-[470px] overflow-hidden rounded-xl bg-blue-500 shadow-2xl">
        <div className="bg-blue-950 px-6 py-4 text-center">
          <h2 className="text-[16px] font-bold text-white">{title}</h2>
        </div>
        <div className="px-8 py-7">{children}</div>
      </div>
    </div>
  );
}

function CapturedImageCard({
  image,
  onToggleSelect,
  onApprove,
  onPrimary,
  onDelete,
  onZoom,
}) {
  const style = DECISION_STYLES[image.decision] || DECISION_STYLES.review;
  return (
    <div
      className={`group relative w-[112px] shrink-0 overflow-hidden rounded-md border bg-[#071626] ${getImageStyle(image)}`}
    >
      <label className="absolute left-1 top-1 z-10 grid h-5 w-5 cursor-pointer place-items-center rounded bg-black/60">
        <input
          type="checkbox"
          checked={image.selected}
          onChange={() => onToggleSelect(image.id)}
          className="h-3.5 w-3.5 accent-blue-600"
        />
      </label>
      {image.isPrimary && (
        <span className="absolute right-1 top-1 z-10 rounded bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
          Primary
        </span>
      )}
      <img
        src={image.src}
        alt={image.source}
        className="h-[78px] w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 hidden h-[78px] items-center justify-center gap-1 bg-black/55 group-hover:flex">
        <button
          onClick={() => onApprove(image.id)}
          title="Approve"
          className="grid h-7 w-7 place-items-center rounded bg-emerald-600 hover:bg-emerald-700"
        >
          <Check size={14} />
        </button>
        <button
          onClick={() => onPrimary(image.id)}
          title="Set Primary"
          className="grid h-7 w-7 place-items-center rounded bg-blue-600 hover:bg-blue-700"
        >
          <Star size={14} />
        </button>
        <button
          onClick={() => onDelete(image.id)}
          title="Delete"
          className="grid h-7 w-7 place-items-center rounded bg-red-600 hover:bg-red-700"
        >
          <Trash2 size={14} />
        </button>
        <button
          onClick={() => onZoom(image)}
          title="Zoom"
          className="grid h-7 w-7 place-items-center rounded bg-slate-700 hover:bg-slate-800"
        >
          <Search size={14} />
        </button>
      </div>
      <div className="p-1.5">
        <div className="flex items-center justify-between gap-1">
          <span
            className={`truncate rounded px-1 py-0.5 text-[8px] font-bold ${style.bg} ${style.text}`}
          >
            {image.qualityScore}% {image.status}
          </span>
          {image.approved && (
            <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
          )}
        </div>
        <p className="mt-1 truncate text-[8px] text-white/55">
          Vis {image.visibility}% | Blur {Math.round(image.blurScore)}
        </p>
      </div>
    </div>
  );
}

function ZoomModal({ image, onClose }) {
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-xl border border-[#2b3e52] bg-[#061421] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#2b3e52] px-4 py-3">
          <h3 className="text-sm font-semibold">Face Image Inspection</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_260px]">
          <img
            src={image.src}
            alt="zoom"
            className="max-h-[70vh] w-full rounded-lg object-contain bg-black"
          />
          <div className="space-y-2 text-[12px] text-white/75">
            <p className="text-lg font-bold text-white">
              {image.qualityScore}% {image.status}
            </p>
            <p>Visibility: {image.visibility}%</p>
            <p>Blur: {Math.round(image.blurScore)}</p>
            <p>Brightness: {Math.round(image.brightness)}</p>
            <p>Confidence: {Math.round(image.confidence)}%</p>
            <p>Faces: {image.faceCount}</p>
            <div className="rounded border border-[#2b3e52] p-2">
              <p className="font-semibold text-white">Reasons</p>
              {(image.reasons || []).map((reason) => (
                <p key={reason} className="mt-1 text-white/65">
                  • {reason}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaceEnrollmentPage() {
  const outletContext = useOutletContext();
  const selectedCamera = outletContext?.selectedCamera || null;
  const activeCameraName =
    selectedCamera?.camera_name ||
    selectedCamera?.cameraName ||
    selectedCamera?.name ||
    "Select Camera";

  const savedDraft = useMemo(() => readSavedDraft(), []);

  const [recognitionEnabled, setRecognitionEnabled] = useState(false);
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState(false);
  const [capturedImages, setCapturedImages] = useState(
    savedDraft?.capturedImages || [],
  );
  const [streamMode, setStreamMode] = useState("normal");
  const [captureMessage, setCaptureMessage] = useState("");
  const [recognitionLoading, setRecognitionLoading] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  const streamImageRef = useRef(null);
  const autoCaptureTimerRef = useRef(null);

  const liveStreamUrl = selectedCamera?.id
    ? streamMode === "recognition"
      ? getFaceRecognitionStreamUrl(selectedCamera.id)
      : getCameraStreamUrl(selectedCamera.id)
    : "";

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [masterDataLoading, setMasterDataLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalValue, setModalValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(savedDraft?.form || EMPTY_PERSON_FORM);
  const [saveLoading, setSaveLoading] = useState(false);
  const [logs, setLogs] = useState(recentEnrollmentLogs);

  const primaryImage = useMemo(
    () =>
      capturedImages.find((image) => image.isPrimary) ||
      capturedImages.find((image) => image.approved) ||
      capturedImages[0],
    [capturedImages],
  );
  const approvedImages = capturedImages.filter((image) => image.approved);
  const selectedImages = capturedImages.filter((image) => image.selected);

  const closeModal = () => {
    setModalType(null);
    setModalValue("");
    setDeleteTarget(null);
  };
  const openAddDepartment = () => {
    setModalType("add-department");
    setModalValue("");
  };
  const openAddRole = () => {
    setModalType("add-role");
    setModalValue("");
  };
  const openDeleteDepartment = (department) => {
    setModalType("delete-department");
    setDeleteTarget(department);
  };
  const openDeleteRole = (role) => {
    setModalType("delete-role");
    setDeleteTarget(role);
  };
  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const loadMasterData = async () => {
    setMasterDataLoading(true);

    try {
      const [departmentRes, roleRes] = await Promise.all([
        getDepartments(),
        getRoles(),
      ]);

      const departmentList = departmentRes?.data || [];
      const roleList = roleRes?.data || [];

      setDepartments(departmentList);
      setRoles(roleList);

      setForm((prev) => ({
        ...prev,
        department: departmentList.some((item) => item.name === prev.department)
          ? prev.department
          : "",
        role: roleList.some((item) => item.name === prev.role)
          ? prev.role
          : "",
      }));
    } catch (error) {
      setCaptureMessage("Failed to load departments / roles");
    } finally {
      setMasterDataLoading(false);
    }
  };

  const handleAddFromModal = async () => {
    const value = modalValue.trim();
    if (!value) return;

    try {
      const res =
        modalType === "add-department"
          ? await createDepartment({ name: value })
          : await createRole({ name: value });

      if (!res?.ok) {
        setCaptureMessage(res?.message || "Add failed");
        return;
      }

      await loadMasterData();

      if (modalType === "add-department") {
        setForm((prev) => ({ ...prev, department: res.data?.name || value }));
      }

      if (modalType === "add-role") {
        setForm((prev) => ({ ...prev, role: res.data?.name || value }));
      }

      closeModal();
    } catch (error) {
      setCaptureMessage("Add department / role API failed");
    }
  };

  const handleDeleteFromModal = async () => {
    if (!deleteTarget?.id) return;

    try {
      const res =
        modalType === "delete-department"
          ? await deleteDepartment(deleteTarget.id)
          : await deleteRole(deleteTarget.id);

      if (!res?.ok) {
        setCaptureMessage(res?.message || "Delete failed");
        return;
      }

      if (modalType === "delete-department") {
        const nextDepartments = departments.filter(
          (item) => item.id !== deleteTarget.id,
        );

        setDepartments(nextDepartments);

        if (form.department === deleteTarget.name) {
          setForm((prev) => ({
            ...prev,
            department: "",
          }));
        }
      }

      if (modalType === "delete-role") {
        const nextRoles = roles.filter((item) => item.id !== deleteTarget.id);

        setRoles(nextRoles);

        if (form.role === deleteTarget.name) {
          setForm((prev) => ({
            ...prev,
            role: "",
          }));
        }
      }

      closeModal();
    } catch (error) {
      setCaptureMessage("Delete department / role API failed");
    }
  };

  useEffect(() => {
    loadMasterData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({
        form,
        capturedImages,
      }),
    );
  }, [form, capturedImages]);

  const resetEnrollmentForm = (message = "Enrollment form cleared") => {
    setForm(EMPTY_PERSON_FORM);
    setCapturedImages([]);
    setAutoCaptureEnabled(false);
    setZoomImage(null);
    setCaptureMessage(message);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  useEffect(() => {
    const loadRecognitionStatus = async () => {
      if (!selectedCamera?.id) {
        setRecognitionEnabled(false);
        setStreamMode("normal");
        return;
      }
      const res = await getFaceRecognitionStatus(selectedCamera.id);
      if (res?.ok && res?.data?.recognition_enabled) {
        setRecognitionEnabled(true);
        setStreamMode("recognition");
      } else {
        setRecognitionEnabled(false);
        setStreamMode("normal");
      }
    };
    loadRecognitionStatus();
  }, [selectedCamera?.id]);

  const handleRecognitionToggle = async () => {
    if (!selectedCamera?.id || recognitionLoading) {
      if (!selectedCamera?.id) setCaptureMessage("Please select camera first");
      return;
    }
    setRecognitionLoading(true);
    try {
      if (recognitionEnabled) {
        await stopFaceRecognition(selectedCamera.id);
        setRecognitionEnabled(false);
        setAutoCaptureEnabled(false);
        setStreamMode("normal");
        setCaptureMessage("Recognition OFF: only live camera running");
      } else {
        await startFaceRecognition(selectedCamera.id);
        setRecognitionEnabled(true);
        setStreamMode("recognition");
        setCaptureMessage("Recognition ON: face detection active");
      }
    } catch (error) {
      setCaptureMessage("Recognition toggle failed");
    } finally {
      setRecognitionLoading(false);
    }
  };

  const addEvaluatedImage = (image) => {
    setCapturedImages((prev) => {
      const shouldSetPrimary =
        !prev.some((item) => item.isPrimary) && image.decision === "accepted";
      return [{ ...image, isPrimary: shouldSetPrimary }, ...prev];
    });
  };


  const isAutoGoodImage = (image) => {
    console.log("AUTO IMAGE =", image);

    return image.qualityScore >= 80;
  };

  const handleCaptureFace = async (source = "camera") => {
    if (!recognitionEnabled)
      return setCaptureMessage("Please turn ON Recognition Detection first");
    if (!selectedCamera?.id)
      return setCaptureMessage("Please select camera first");
    if (captureLoading) return;
    setCaptureLoading(true);
    try {
      const res = await captureFace(selectedCamera.id);
      const data = res?.data || res?.detail?.data;
      if (data?.image_url) {
        const image = normalizeCaptureData(data, source);

        // ONLY FOR AUTO CAPTURE
        if (source === "auto" && !isAutoGoodImage(image)) {
          setCaptureMessage(
            `${image.qualityScore}% ${image.status}: Waiting for excellent face`
          );
          return;
        }

        addEvaluatedImage(image);

        setCaptureMessage(
          `${image.qualityScore}% ${image.status}: ${image.reasons?.[0] || "Face evaluated"}`
        );

        return;
      }
      setCaptureMessage(res?.message || res?.detail || "Face capture failed");
    } catch (error) {
      const data =
        error?.response?.data?.detail?.data || error?.response?.data?.data;
      if (data?.image_url) {
        const image = normalizeCaptureData(data, source);
        console.log("AUTO IMAGE =", image);

        if (source === "auto" && !isAutoGoodImage(image)) {
          setCaptureMessage(
            `${image.qualityScore}% ${image.status}: Waiting for excellent face`
          );
          return;
        }

        addEvaluatedImage(image);

        setCaptureMessage(
          `${image.qualityScore}% ${image.status}: ${image.reasons?.[0] || "Face evaluated"}`
        );
      }
    } finally {
      setCaptureLoading(false);
    }
  };

  const handleImportFaces = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setImportLoading(true);
    try {
      const res = await importFaces(files);
      const results = res?.data?.results || [];
      const evaluatedImages = results
        .filter((item) => item.data?.image_url)
        .map((item) =>
          normalizeCaptureData(item.data, "import", item.file_name),
        );
      if (evaluatedImages.length) {
        setCapturedImages((prev) => {
          const hasPrimary = prev.some((item) => item.isPrimary);
          let primaryAssigned = hasPrimary;
          const nextImages = evaluatedImages.map((image) => {
            if (!primaryAssigned && image.decision === "accepted") {
              primaryAssigned = true;
              return { ...image, isPrimary: true };
            }
            return image;
          });
          return [...nextImages, ...prev];
        });
      }
      setCaptureMessage(
        `${evaluatedImages.length} image(s) evaluated from ${files.length} file(s)`,
      );
    } catch (error) {
      setCaptureMessage("Import faces API failed");
    } finally {
      setImportLoading(false);
      event.target.value = "";
    }
  };

  const handleAutoCaptureToggle = () => {
    if (!recognitionEnabled)
      return setCaptureMessage("Please turn ON Recognition Detection first");
    if (!selectedCamera?.id)
      return setCaptureMessage("Please select camera first");
    setAutoCaptureEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (!autoCaptureEnabled || !recognitionEnabled || !selectedCamera?.id) {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }
      return;
    }
    autoCaptureTimerRef.current = setInterval(
      () => handleCaptureFace("auto"),
      3000,
    );
    return () => {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }
    };
  }, [
    autoCaptureEnabled,
    recognitionEnabled,
    selectedCamera?.id,
    captureLoading,
  ]);

  const toggleImageSelect = (id) =>
    setCapturedImages((prev) =>
      prev.map((image) =>
        image.id === id ? { ...image, selected: !image.selected } : image,
      ),
    );
  const approveImage = (id) =>
    setCapturedImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? {
              ...image,
              approved: true,
              decision: "accepted",
              status:
                image.status === "Rejected"
                  ? "Operator Accepted"
                  : image.status,
            }
          : image,
      ),
    );
  const setPrimaryImage = (id) =>
    setCapturedImages((prev) =>
      prev.map((image) => ({
        ...image,
        isPrimary: image.id === id,
        approved: image.id === id ? true : image.approved,
        selected: image.id === id ? true : image.selected,
      })),
    );
  const deleteImage = (id) => {
    if (!window.confirm("Delete this image?")) return;
    setCapturedImages((prev) => prev.filter((image) => image.id !== id));
  };
  const acceptSelected = () =>
    setCapturedImages((prev) =>
      prev.map((image) =>
        image.selected
          ? {
              ...image,
              approved: true,
              decision: "accepted",
              status:
                image.status === "Rejected"
                  ? "Operator Accepted"
                  : image.status,
            }
          : image,
      ),
    );
  const deleteSelected = () => {
    if (!selectedImages.length)
      return setCaptureMessage("Select image(s) first");
    if (!window.confirm(`Delete ${selectedImages.length} selected image(s)?`))
      return;
    setCapturedImages((prev) => prev.filter((image) => !image.selected));
  };
  const primarySelected = () => {
    if (selectedImages.length !== 1)
      return setCaptureMessage("Select exactly one image to set Primary");
    setPrimaryImage(selectedImages[0].id);
  };

  const buildEnrollmentPayload = (finalImages, primary) => ({
    fullName: form.fullName.trim(),
    employeeId: form.employeeId.trim(),
    department: form.department,
    role: form.role,
    mobile: form.mobile.trim(),
    email: form.email.trim(),
    images: finalImages.map((image) => ({
      image_base64: image.src,
      src: image.src,
      isPrimary: image.id === primary.id,
      qualityScore: image.qualityScore,
      status: image.status,
    })),
  });

  const handleSave = async () => {
    if (saveLoading) return;

    const finalImages = capturedImages.filter(
      (image) => image.approved && image.decision !== "rejected",
    );

    if (!form.fullName.trim()) return setCaptureMessage("Full name is required");
    if (!form.employeeId.trim()) return setCaptureMessage("Employee ID is required");
    if (!form.department) return setCaptureMessage("Please select department");
    if (!form.role) return setCaptureMessage("Please select role / access");

    if (!finalImages.length) {
      return setCaptureMessage(
        "Approve at least one accepted/review face image before enrollment",
      );
    }

    const primary =
      finalImages.find((image) => image.isPrimary) || finalImages[0];

    setSaveLoading(true);

    try {
      const payload = buildEnrollmentPayload(finalImages, primary);
      const res = await enrollFacePerson(payload);

      if (!res?.ok) {
        setCaptureMessage(res?.message || "Enrollment failed");
        return;
      }

      const avgScore = Math.round(
        finalImages.reduce((sum, image) => sum + image.qualityScore, 0) /
          finalImages.length,
      );

      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleString(),
        name: payload.fullName,
        employeeId: payload.employeeId,
        camera: activeCameraName,
        status: "Enrolled",
        score: `${avgScore}%`,
        action: "View",
      };

      setLogs((prev) => [newLog, ...prev]);
      resetEnrollmentForm("Person enrolled and activated successfully");
    } catch (error) {
      setCaptureMessage("Enroll API failed");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEnrollment = () => {
    resetEnrollmentForm("Enrollment form cancelled");
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden text-white">
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_255px]">
        <main className="min-w-0 space-y-3 overflow-x-hidden">
          <div className="grid w-full min-w-0 grid-cols-4 gap-2">
            {enrollmentStats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_350px]">
            <section className="min-w-0 overflow-hidden rounded-lg border border-[#2b3e52] bg-[#061421]">
              <div className="flex min-h-[42px] items-center justify-between gap-2 border-b border-[#2b3e52] px-3 py-2">
                <h3 className="min-w-0 flex-1 text-[12px] font-semibold leading-tight text-white xl:text-[13px]">
                  {activeCameraName}
                </h3>
                <div className="flex shrink-0 items-center gap-2 text-[10px]">
                  <span
                    className={`h-2 w-2 rounded-full ${liveStreamUrl ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                  <span className="leading-tight text-white/70">
                    <span className="block text-[8px] sm:text-[10px]">
                      Recognition:
                    </span>
                    <b className="block whitespace-nowrap text-[8px] font-semibold text-emerald-400 sm:text-[9px]">
                      {recognitionEnabled
                        ? "Detection active"
                        : "Detection off"}
                    </b>
                  </span>
                  <button
                    type="button"
                    onClick={handleRecognitionToggle}
                    disabled={recognitionLoading}
                    className={`flex items-center gap-1.5 font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${recognitionEnabled ? "text-emerald-400" : "text-red-400"}`}
                  >
                    <span
                      className={`relative h-[18px] w-[32px] rounded-full ${recognitionEnabled ? "bg-emerald-600" : "bg-red-600"}`}
                    >
                      <span
                        className={`absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-white transition-all ${recognitionEnabled ? "right-[3px]" : "left-[3px]"}`}
                      />
                    </span>
                    {recognitionLoading
                      ? "..."
                      : recognitionEnabled
                        ? "ON"
                        : "OFF"}
                  </button>
                </div>
              </div>

              <div className="relative h-[288px] overflow-hidden bg-black xl:h-[300px]">
                <StreamImage
                  src={liveStreamUrl}
                  alt={activeCameraName}
                  className="h-full w-full object-cover opacity-80"
                  imageRef={streamImageRef}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-[#2b3e52] p-3">
                <button
                  onClick={() => handleCaptureFace("camera")}
                  disabled={!recognitionEnabled || captureLoading}
                  className={`flex h-[72px] min-w-0 flex-col items-center justify-center rounded-md px-1.5 text-center 2xl:px-2 ${recognitionEnabled && !captureLoading ? "bg-blue-700 hover:bg-blue-800" : "cursor-not-allowed bg-slate-700 opacity-50"}`}
                >
                  <div className="flex min-w-0 items-center justify-center gap-1 2xl:gap-2">
                    <Camera
                      size={14}
                      className="shrink-0 text-white 2xl:size-4"
                    />
                    <span className="truncate text-[9px] font-semibold text-white xl:text-[10px] 2xl:text-[12px]">
                      {captureLoading ? "Checking..." : "Capture Face"}
                    </span>
                  </div>
                  <span className="mt-1 line-clamp-2 text-[8px] font-normal leading-tight text-white/75 2xl:text-[10px]">
                    AI quality validation
                  </span>
                </button>

                <label className="flex h-[72px] min-w-0 cursor-pointer flex-col items-center justify-center rounded-md border border-[#2b3e52] bg-[#071626] px-1.5 text-center hover:bg-[#0b2238] 2xl:px-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImportFaces}
                    className="hidden"
                  />
                  <div className="flex min-w-0 items-center justify-center gap-1 2xl:gap-2">
                    <Import
                      size={14}
                      className="shrink-0 text-white 2xl:size-4"
                    />
                    <span className="truncate text-[9px] font-semibold text-white xl:text-[10px] 2xl:text-[12px]">
                      {importLoading ? "Importing..." : "Import Faces"}
                    </span>
                  </div>
                  <span className="mt-1 line-clamp-2 text-[8px] leading-tight text-white/60 2xl:text-[10px]">
                    Bulk evaluation
                  </span>
                </label>

                <button
                  onClick={handleAutoCaptureToggle}
                  className={`relative flex h-[72px] min-w-0 flex-col items-center justify-center rounded-md border border-[#2b3e52] px-1.5 text-center 2xl:px-2 ${recognitionEnabled ? "bg-[#071626] hover:bg-[#0b2238]" : "bg-slate-800 opacity-60"}`}
                >
                  <div className="flex min-w-0 items-center justify-center gap-1 2xl:gap-2">
                    <span className="truncate text-[9px] font-semibold text-white xl:text-[10px] 2xl:text-[12px]">
                      Auto Capture
                    </span>
                    <span
                      className={`relative h-[14px] w-[26px] shrink-0 rounded-full 2xl:h-[16px] 2xl:w-[30px] ${autoCaptureEnabled ? "bg-blue-600" : "bg-red-600"}`}
                    >
                      <span
                        className={`absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-white 2xl:h-[10px] 2xl:w-[10px] ${autoCaptureEnabled ? "right-[3px]" : "left-[3px]"}`}
                      />
                    </span>
                  </div>
                  <span className="mt-1 line-clamp-2 text-[8px] leading-tight text-white/60 2xl:text-[10px]">
                    Every 3s when enabled
                  </span>
                  <Info
                    size={11}
                    className="absolute bottom-1 right-1 text-white/55 2xl:size-[13px]"
                  />
                </button>
              </div>

              {captureMessage && (
                <div className="border-t border-[#2b3e52] px-3 py-2 text-[11px] text-white/65">
                  {captureMessage}
                </div>
              )}

              <div className="border-t border-[#2b3e52] p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h4 className="truncate text-sm font-semibold">
                    Captured Images{" "}
                    <span className="text-xs font-normal text-white/45">
                      ({approvedImages.length} approved /{" "}
                      {capturedImages.length} total)
                    </span>
                  </h4>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={acceptSelected}
                      className="rounded bg-emerald-600 px-2 py-1 text-[9px] font-semibold hover:bg-emerald-700"
                    >
                      Accept Selected
                    </button>
                    <button
                      onClick={primarySelected}
                      className="rounded bg-blue-600 px-2 py-1 text-[9px] font-semibold hover:bg-blue-700"
                    >
                      Set Primary
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="rounded bg-red-600 px-2 py-1 text-[9px] font-semibold hover:bg-red-700"
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {capturedImages.map((image) => (
                    <CapturedImageCard
                      key={image.id}
                      image={image}
                      onToggleSelect={toggleImageSelect}
                      onApprove={approveImage}
                      onPrimary={setPrimaryImage}
                      onDelete={deleteImage}
                      onZoom={setZoomImage}
                    />
                  ))}
                  {capturedImages.length === 0 && (
                    <div className="grid h-[112px] min-w-[180px] place-items-center rounded-md border border-dashed border-white/25 px-3 text-center text-[11px] text-white/45">
                      No captured images yet
                    </div>
                  )}
                  <button
                    onClick={() => handleCaptureFace("camera")}
                    className={`grid h-[112px] w-[112px] shrink-0 place-items-center rounded-md border border-dashed border-white/45 text-xs text-white/65 ${recognitionEnabled ? "hover:bg-white/5" : "cursor-not-allowed opacity-50"}`}
                  >
                    <span>
                      <Plus className="mx-auto mb-1" size={24} />
                      Add
                      <br />
                      More
                    </span>
                  </button>
                </div>
              </div>
            </section>

            <section className="min-w-0 overflow-hidden rounded-lg border border-[#2b3e52] bg-[#061421]">
              <div className="border-b border-[#2b3e52] px-3 py-2">
                <h3 className="text-[13px] font-semibold">Person Details</h3>
              </div>
              <div className="space-y-2 p-3">
                <FormRow label="Full Name" required>
                  <input
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  />
                </FormRow>
                <FormRow label="Employee ID" required>
                  <input
                    value={form.employeeId}
                    onChange={(e) => handleChange("employeeId", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  />
                </FormRow>
                <FormRow label="Department" required>
                  <select
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  >
                    <option value="">
                      {masterDataLoading ? "Loading departments..." : "Select Department"}
                    </option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
                <FormRow label="Role / Access" required>
                  <select
                    value={form.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  >
                    <option value="">
                      {masterDataLoading ? "Loading roles..." : "Select Role"}
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
                <FormRow label="Mobile Number">
                  <input
                    value={form.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  />
                </FormRow>
                <FormRow label="Email">
                  <input
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="h-7 w-full min-w-0 rounded-md border border-[#2b3e52] bg-[#030d19] px-2 text-[10px] outline-none focus:border-blue-500 xl:h-8 xl:text-[11px]"
                  />
                </FormRow>
              </div>

              <div className="border-t border-[#2b3e52] p-3">
                <h3 className="mb-2 text-[13px] font-semibold">
                  Preview / Primary Face Template
                </h3>
                <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-2 xl:grid-cols-[92px_minmax(0,1fr)]">
                  <StreamImage
                    src={primaryImage?.src || ""}
                    alt={primaryImage?.source || activeCameraName}
                    className="h-[132px] w-full rounded-md border border-blue-500 object-cover"
                    fallbackClassName="flex h-[132px] w-full items-center justify-center rounded-md bg-[#050f19] text-[10px] text-white/40"
                    fallbackText="No Primary"
                  />
                  <div className="min-w-0 rounded-md border border-[#2b3e52] bg-[#071626] p-2">
                    <p className="truncate text-[9px] text-white/60 xl:text-[10px]">
                      Image Quality Score
                    </p>
                    <h2 className="mt-1 text-[22px] font-bold leading-none">
                      {primaryImage ? `${primaryImage.qualityScore}%` : "0%"}
                    </h2>
                    <div className="my-2 h-1.5 rounded bg-white/10">
                      <div
                        className={`h-full rounded ${primaryImage?.decision === "rejected" ? "bg-red-500" : primaryImage?.decision === "review" ? "bg-yellow-400" : "bg-emerald-500"}`}
                        style={{ width: `${primaryImage?.qualityScore || 0}%` }}
                      />
                    </div>
                    <QualityRow
                      label="Face Detected"
                      ok={!!primaryImage?.checks?.face_detected}
                      value={primaryImage ? "Yes" : "No"}
                    />
                    <QualityRow
                      label="Single Face"
                      ok={!!primaryImage?.checks?.single_face}
                      value={primaryImage?.faceCount || "—"}
                    />
                    <QualityRow
                      label="Pose"
                      ok={!!primaryImage?.checks?.pose}
                      value={primaryImage ? "OK" : "—"}
                    />
                    <QualityRow
                      label="Lighting"
                      ok={!!primaryImage?.checks?.lighting}
                      value={
                        primaryImage ? Math.round(primaryImage.brightness) : "—"
                      }
                    />
                    <QualityRow
                      label="Clarity"
                      ok={!!primaryImage?.checks?.clarity}
                      value={
                        primaryImage ? Math.round(primaryImage.blurScore) : "—"
                      }
                    />
                    <QualityRow
                      label="Visibility"
                      ok={!!primaryImage?.checks?.visibility}
                      value={primaryImage ? `${primaryImage.visibility}%` : "—"}
                    />
                    <QualityRow
                      label="Eyes"
                      ok={!!primaryImage?.checks?.eye_visibility}
                      value={primaryImage ? "Visible" : "—"}
                    />
                  </div>
                </div>
                {primaryImage?.reasons?.length > 0 && (
                  <div className="mt-2 rounded border border-[#2b3e52] bg-[#030d19] p-2 text-[10px] text-white/65">
                    <b className="text-white">Reason:</b>{" "}
                    {primaryImage.reasons[0]}
                  </div>
                )}
              </div>

              <div className="space-y-2 p-3">
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="w-full rounded-md bg-blue-700 py-2.5 text-[12px] font-semibold hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveLoading ? "Saving..." : "Enroll & Activate"}
                  <span className="block text-[9px] font-normal text-white/70">
                    Save approved images and activate recognition
                  </span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="w-full rounded-md border border-[#2b3e52] bg-[#030d19] py-2.5 text-[12px] hover:bg-[#0b2238] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveLoading ? "Saving..." : "Activate & Add Next"}
                  <span className="block text-[9px] text-white/60">
                    Save, activate and add next person
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleCancelEnrollment}
                  className="w-full rounded-md border border-red-600 py-2 text-[12px] text-red-500 hover:bg-red-500/10"
                >
                  Cancel
                </button>
              </div>
            </section>
          </div>

          <section className="min-w-0 overflow-hidden rounded-lg border border-[#1b344d] bg-[#061421]">
            <div className="flex h-[36px] items-center justify-between gap-2 border-b border-[#1b344d] px-3">
              <h3 className="truncate text-sm font-semibold">
                Recent Enrollment Logs
              </h3>
              <button className="flex shrink-0 items-center gap-1 text-xs text-white/60 hover:text-white">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="h-[150px] overflow-y-auto overflow-x-hidden">
              <table className="w-full table-fixed border-collapse text-left text-[9px]">
                <thead className="sticky top-0 z-10 bg-[#082136] text-white/60">
                  <tr className="h-[28px]">
                    <th className="w-[20%] px-2 py-1">Time</th>
                    <th className="w-[16%] px-2 py-1">Name</th>
                    <th className="w-[14%] px-2 py-1">Employee ID</th>
                    <th className="w-[16%] px-2 py-1">Camera</th>
                    <th className="w-[12%] px-2 py-1">Status</th>
                    <th className="w-[12%] px-2 py-1">Quality</th>
                    <th className="w-[10%] px-2 py-1 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((row) => (
                    <tr
                      key={row.id}
                      className="h-[30px] border-t border-[#1b344d] hover:bg-[#0b2238]"
                    >
                      <td className="px-2 py-1">
                        <LogCell>{row.time}</LogCell>
                      </td>
                      <td className="px-2 py-1">
                        <LogCell>{row.name}</LogCell>
                      </td>
                      <td className="px-2 py-1">
                        <LogCell>{row.employeeId}</LogCell>
                      </td>
                      <td className="px-2 py-1">
                        <LogCell>{row.camera}</LogCell>
                      </td>
                      <td className="px-2 py-1">
                        <LogStatusBadge status={row.status} />
                      </td>
                      <td className="px-2 py-1">
                        <LogCell>{row.score}</LogCell>
                      </td>
                      <td className="px-2 py-1">
                        <div className="flex justify-center">
                          {row.action === "Re-enroll" ? (
                            <button
                              title="Re-enroll"
                              className="flex items-center gap-1 text-blue-500 hover:text-blue-400"
                            >
                              <RotateCcw size={12} />
                              <span className="hidden xl:inline">
                                Re-enroll
                              </span>
                            </button>
                          ) : (
                            <button
                              title="View"
                              className="flex items-center gap-1 text-white/70 hover:text-white"
                            >
                              <Eye size={12} />
                              <span className="hidden xl:inline">View</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#1b344d] px-3 py-2 text-xs text-white/50">
              Showing 1 to {Math.min(logs.length, 5)} of {logs.length} entries
            </div>
          </section>
        </main>

        <aside className="grid h-[900px] w-[255px] min-w-0 grid-rows-[160px_255px_250px_250px] gap-3">
          <section className="min-h-0 w-full min-w-0 rounded-lg border border-[#1b344d] bg-[#061421] p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="truncate text-[12px] font-semibold">
                Recognition Performance
              </h3>
              <button className="flex shrink-0 items-center gap-1 rounded border border-[#2b3e52] bg-[#071626] px-2 py-1 text-[10px] text-white/70 hover:text-white">
                Today <ChevronDown size={12} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative grid h-[100px] w-[100px] shrink-0 place-items-center rounded-full bg-[conic-gradient(#22c55e_0deg_347deg,#0b2238_347deg_360deg)]">
                <div className="grid h-[82px] w-[82px] place-items-center rounded-full bg-[#061421]">
                  <div className="text-center">
                    <h2 className="text-[16px] font-bold leading-none text-white">
                      96.4%
                    </h2>
                    <p className="mt-1 text-[9px] leading-tight text-white/70">
                      Overall
                    </p>
                    <p className="text-[9px] leading-tight text-white/70">
                      Accuracy
                    </p>
                    <p className="mt-1 text-[8px] text-white/60">Excellent</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                {recognitionStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 text-[9px]"
                  >
                    <span className="flex min-w-0 items-center gap-1.5 truncate text-white/75">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-sm ${item.color}`}
                      />
                      <span title={item.label} className="truncate">
                        {item.label}
                      </span>
                    </span>
                    <span className="shrink-0 text-white/80">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex min-h-0 w-full min-w-0 flex-col rounded-lg border border-[#1b344d] bg-[#061421] p-3">
            <div className="mb-2 flex shrink-0 justify-between gap-2">
              <h3 className="truncate text-[12px] font-semibold">
                Alerts & Notifications
              </h3>
              <button className="flex shrink-0 items-center gap-1 text-[10px] text-white/60 hover:text-white">
                View All <ChevronRight size={13} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {alerts.map((alert) => {
                const Icon = alert.icon || AlertTriangle;
                return (
                  <div
                    key={alert.id}
                    className="flex min-w-0 gap-2 border-b border-[#1b344d] py-2 last:border-0"
                  >
                    <Icon
                      size={15}
                      className={
                        alert.type === "danger"
                          ? "shrink-0 text-red-500"
                          : alert.type === "warn"
                            ? "shrink-0 text-yellow-400"
                            : "shrink-0 text-blue-500"
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        title={alert.title}
                        className="truncate text-[10px] font-semibold"
                      >
                        {alert.title}
                      </p>
                      <p
                        title={alert.desc}
                        className="truncate text-[9px] text-white/45"
                      >
                        {alert.desc}
                      </p>
                    </div>
                    <span className="shrink-0 text-[9px] text-white/45">
                      {alert.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <ManageListSection
            title="Departments"
            items={departments}
            onAddClick={openAddDepartment}
            onDeleteClick={openDeleteDepartment}
            nameHeader="Department Name"
            addButtonText="+ Add"
          />
          <ManageListSection
            title="Role / Access"
            items={roles}
            onAddClick={openAddRole}
            onDeleteClick={openDeleteRole}
            nameHeader="Role Name"
            addButtonText="+ Add"
          />
        </aside>
      </div>

      <ZoomModal image={zoomImage} onClose={() => setZoomImage(null)} />

      {(modalType === "add-department" || modalType === "add-role") && (
        <PopupModal>
          <p className="mb-5 text-center text-[13px] font-semibold text-white">
            Enter new {modalType === "add-department" ? "department" : "role"}{" "}
            name
          </p>
          <input
            value={modalValue}
            onChange={(e) => setModalValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddFromModal();
            }}
            placeholder={
              modalType === "add-department"
                ? "Enter department name"
                : "Enter role name"
            }
            autoFocus
            className="mb-4 h-8 w-full rounded bg-blue-950 px-3 text-[13px] text-white outline-none placeholder:text-white/45"
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddFromModal}
              className="h-9 rounded-md bg-blue-950 text-[14px] font-bold text-white hover:bg-blue-900"
            >
              Add
            </button>
            <button
              onClick={closeModal}
              className="h-9 rounded-md bg-blue-950 text-[14px] font-bold text-white hover:bg-blue-900"
            >
              Cancel
            </button>
          </div>
        </PopupModal>
      )}
      {(modalType === "delete-department" || modalType === "delete-role") && (
        <PopupModal>
          <p className="mb-7 text-center text-[13px] font-semibold text-white">
            Are you sure you want to delete this{" "}
            {modalType === "delete-department" ? "department" : "role"}?
            {deleteTarget?.name && (
              <span className="mt-2 block text-white/80">
                {deleteTarget.name}
              </span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDeleteFromModal}
              className="h-9 rounded-md bg-blue-950 text-[14px] font-bold text-white hover:bg-blue-900"
            >
              Confirm Delete
            </button>
            <button
              onClick={closeModal}
              className="h-9 rounded-md bg-blue-950 text-[14px] font-bold text-white hover:bg-blue-900"
            >
              Cancel
            </button>
          </div>
        </PopupModal>
      )}
    </div>
  );
}
