import { useMemo, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Eye,
  Filter,
  PauseCircle,
  Power,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

const people = [
  {
    id: 1,
    name: "Amit Singh",
    employeeId: "EMP1023",
    department: "Operations",
    role: "Worker",
    status: "Active",
    faceQuality: 92,
    enrolledOn: "23 Apr 2026\n12:05 PM",
    lastSeen: "23 Apr 2026\n11:52 AM",
    mobile: "9876543210",
    email: "amit.singh@company.com",
    camera: "Camera 1 - Gate",
    image: "https://i.pravatar.cc/160?img=12",
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    employeeId: "EMP1001",
    department: "Operations",
    role: "Worker",
    status: "Active",
    faceQuality: 88,
    enrolledOn: "23 Apr 2026\n12:03 PM",
    lastSeen: "23 Apr 2026\n11:40 AM",
    mobile: "9876500011",
    email: "ramesh.kumar@company.com",
    camera: "Camera 1 - Gate",
    image: "https://i.pravatar.cc/160?img=13",
  },
  {
    id: 3,
    name: "Vikash Yadav",
    employeeId: "EMP1004",
    department: "Security",
    role: "Guard",
    status: "Active",
    faceQuality: 90,
    enrolledOn: "23 Apr 2026\n12:01 PM",
    lastSeen: "23 Apr 2026\n10:58 AM",
    mobile: "9876500012",
    email: "vikash.yadav@company.com",
    camera: "Camera 2 - Warehouse",
    image: "https://i.pravatar.cc/160?img=14",
  },
  {
    id: 4,
    name: "Suresh Patel",
    employeeId: "EMP1008",
    department: "Warehouse",
    role: "Worker",
    status: "Inactive",
    faceQuality: 61,
    enrolledOn: "20 Apr 2026\n10:15 AM",
    lastSeen: "20 Apr 2026\n09:20 AM",
    mobile: "9876500013",
    email: "suresh.patel@company.com",
    camera: "Camera 3 - Store",
    image: "https://i.pravatar.cc/160?img=15",
  },
  {
    id: 5,
    name: "Deepak Sharma",
    employeeId: "EMP1011",
    department: "Logistics",
    role: "Operator",
    status: "Active",
    faceQuality: 85,
    enrolledOn: "23 Apr 2026\n11:56 AM",
    lastSeen: "23 Apr 2026\n11:30 AM",
    mobile: "9876500014",
    email: "deepak.sharma@company.com",
    camera: "Camera 4 - Loading",
    image: "https://i.pravatar.cc/160?img=16",
  },
  {
    id: 6,
    name: "Mahesh Verma",
    employeeId: "EMP1015",
    department: "Maintenance",
    role: "Technician",
    status: "Archived",
    faceQuality: 78,
    enrolledOn: "18 Apr 2026\n09:42 AM",
    lastSeen: "18 Apr 2026\n08:10 AM",
    mobile: "9876500015",
    email: "mahesh.verma@company.com",
    camera: "Camera 2 - Warehouse",
    image: "https://i.pravatar.cc/160?img=17",
  },
  {
    id: 7,
    name: "Pawan Gupta",
    employeeId: "EMP1020",
    department: "Operations",
    role: "Worker",
    status: "Inactive",
    faceQuality: 63,
    enrolledOn: "19 Apr 2026\n04:22 PM",
    lastSeen: "19 Apr 2026\n04:10 PM",
    mobile: "9876500016",
    email: "pawan.gupta@company.com",
    camera: "Camera 1 - Gate",
    image: "https://i.pravatar.cc/160?img=18",
  },
  {
    id: 8,
    name: "Rohit Mehta",
    employeeId: "EMP1025",
    department: "Security",
    role: "Guard",
    status: "Active",
    faceQuality: 93,
    enrolledOn: "23 Apr 2026\n10:22 AM",
    lastSeen: "23 Apr 2026\n11:15 AM",
    mobile: "9876500017",
    email: "rohit.mehta@company.com",
    camera: "Camera 5 - Entry",
    image: "https://i.pravatar.cc/160?img=19",
  },
];

const stats = [
  {
    label: "Total Enrolled",
    value: "1,156",
    note: "All Time",
    change: "↑ 12.6%",
    color: "blue",
    icon: UserRound,
  },
  {
    label: "Active",
    value: "942",
    note: "81.6% of total",
    change: "↑ 9.3%",
    color: "green",
    icon: CheckCircle,
  },
  {
    label: "Inactive",
    value: "156",
    note: "13.5% of total",
    change: "↓ 2.1%",
    color: "amber",
    icon: PauseCircle,
  },
  {
    label: "Archived",
    value: "58",
    note: "5.0% of total",
    change: "↑ 1.0%",
    color: "purple",
    icon: Archive,
  },
];

function StatCard({ item }) {
  const Icon = item.icon;

  const colors = {
    blue: "from-blue-700 to-blue-500",
    green: "from-emerald-700 to-emerald-500",
    amber: "from-amber-600 to-orange-500",
    purple: "from-violet-700 to-purple-500",
  };

  return (
    <div className="h-[92px] min-w-0 rounded-lg border border-[#123250] bg-[#061421]/90 px-2.5 py-2 shadow-lg">
      <div className="flex h-full min-w-0 items-center gap-2 2xl:gap-4">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${colors[item.color]} 2xl:h-10 2xl:w-10`}
        >
          <Icon size={21} className="text-white" />
        </div>

        <div className="min-w-0 leading-none">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-white/70 2xl:text-[11px]">
            {item.label}
          </p>
          <h3 className="mt-1 text-[16px] font-bold leading-none text-white 2xl:text-[18px]">
            {item.value}
          </h3>
          <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5 2xl:gap-x-2">
            <p className="truncate text-[9px] text-white/65 2xl:text-[10px]">
              {item.note}
            </p>
            <p
              className={`text-[9px] font-semibold 2xl:text-[10px] ${
                item.change.includes("↓") ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {item.change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaceQualityCard() {
  return (
    <div className="h-[92px] min-w-0 rounded-lg border border-[#123250] bg-[#061421]/90 px-2.5 py-2 shadow-lg">
      <div className="flex h-full min-w-0 items-center gap-2 2xl:gap-3">
        <div className="grid h-17 w-17 shrink-0 place-items-center rounded-full border-[4px] border-emerald-500 2xl:h-16 2xl:w-16">
          <span className="text-[16px] font-bold leading-none text-white 2xl:text-[18px]">
            91%
          </span>
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-white/70 2xl:text-[11px]">
            Face Quality (Avg)
          </p>
          <p className="mt-1 line-clamp-2 text-[9px] leading-3 text-white/75 2xl:text-[10px] 2xl:leading-4">
            Average image quality across all enrolled faces
          </p>
        </div>
      </div>
    </div>
  );
}

function QualityText({ value }) {
  const label = value >= 90 ? "Excellent" : value >= 75 ? "Good" : "Fair";
  const color =
    value >= 90
      ? "text-emerald-400"
      : value >= 75
      ? "text-green-400"
      : "text-amber-400";

  return (
    <div className="leading-none">
      <p className="text-[11px] font-semibold text-white">{value}%</p>
      <p className={`mt-1 text-[9px] font-medium ${color}`}>{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-emerald-500/60 bg-emerald-500/10 text-emerald-400",
    Inactive: "border-amber-500/60 bg-amber-500/10 text-amber-400",
    Archived: "border-violet-500/60 bg-violet-500/10 text-violet-400",
  };

  return (
    <span
      className={`inline-flex rounded border px-1.5 py-0.5 text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ActionButton({ icon: Icon, color = "default" }) {
  const styles = {
    default: "border-white/20 text-white hover:bg-white/10",
    blue: "border-blue-500/60 text-blue-400 hover:bg-blue-500/10",
    red: "border-red-500/60 text-red-400 hover:bg-red-500/10",
  };

  return (
    <button
      type="button"
      className={`grid h-5 w-5 shrink-0 place-items-center rounded border transition 2xl:h-6 2xl:w-6 ${styles[color]}`}
    >
      <Icon size={11} />
    </button>
  );
}

function MobilePersonCard({ person, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-[#123250] bg-[#061421]/90 p-3 text-left"
    >
      <div className="flex items-center gap-3">
        <img
          src={person.image}
          alt={person.name}
          className="h-10 w-10 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {person.name}
          </p>
          <p className="text-xs text-white/60">{person.employeeId}</p>
        </div>
        <StatusBadge status={person.status} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/75">
        <p>Dept: {person.department}</p>
        <p>Role: {person.role}</p>
        <p>Quality: {person.faceQuality}%</p>
        <p className="truncate">Seen: {person.lastSeen.replace("\n", ", ")}</p>
      </div>
    </button>
  );
}

export default function EnrolledPersons() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [role, setRole] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const matchSearch =
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        person.department.toLowerCase().includes(search.toLowerCase()) ||
        person.role.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" || person.status === status;
      const matchDepartment =
        department === "All" || person.department === department;
      const matchRole = role === "All" || person.role === role;

      return matchSearch && matchStatus && matchDepartment && matchRole;
    });
  }, [search, status, department, role]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#020817] p-2 text-white sm:p-1">
      <section className="grid grid-cols-5 gap-2 overflow-hidden">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
        <FaceQualityCard />
      </section>

      <section className="mt-3 grid grid-cols-1 items-stretch gap-2 lg:grid-cols-[minmax(0,1fr)_260px] 2xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-w-0 flex-col">
          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(115px,1fr)_62px_62px_62px_112px_68px_76px] 2xl:grid-cols-[minmax(180px,1fr)_90px_90px_90px_150px_90px_90px]">
            <div className="relative min-w-0">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, employee ID, department, role..."
                className="h-10 w-full rounded-md border border-[#123250] bg-[#020817] pl-7 pr-1.5 text-[8px] text-white outline-none placeholder:text-white/45 focus:border-blue-500 2xl:h-10 2xl:pl-9 2xl:text-[10px]"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[9px] text-white outline-none focus:border-blue-500 2xl:h-10 2xl:text-[10px]"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Archived</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-10 min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[9px] text-white outline-none focus:border-blue-500 2xl:h-10 2xl:text-[10px]"
            >
              <option>All</option>
              <option>Operations</option>
              <option>Security</option>
              <option>Warehouse</option>
              <option>Logistics</option>
              <option>Maintenance</option>
            </select>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-10 min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[9px] text-white outline-none focus:border-blue-500 2xl:h-10 2xl:text-[10px]"
            >
              <option>All</option>
              <option>Worker</option>
              <option>Guard</option>
              <option>Operator</option>
              <option>Technician</option>
            </select>

            <button className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-md border border-[#123250] bg-[#020817] px-1.5 text-[8px] hover:bg-[#0b2238] 2xl:h-10 2xl:px-2 2xl:text-[9px]">
              <Calendar size={12} />
              23 Apr 2026
            </button>

            <button className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-md border border-[#123250] bg-[#020817] px-1.5 text-[9px] hover:bg-[#0b2238] 2xl:h-10 2xl:px-2 2xl:text-[10px]">
              <Filter size={12} />
              Filters
            </button>

            <button className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-md bg-blue-700 px-2 text-[9px] font-semibold hover:bg-blue-600 2xl:h-10 2xl:px-3 2xl:text-[10px]">
              <Download size={12} />
              Export
            </button>
          </div>

          <div className="hidden h-[calc(100vh-180px)] min-h-[590px] flex-col overflow-hidden rounded-lg border border-[#123250] bg-[#061421]/90 lg:flex 2xl:h-[calc(100vh-210px)] 2xl:min-h-[550px]">
            <div className="flex-1 overflow-auto">
              <table className="min-w-[760px] w-full table-fixed border-collapse text-left text-[9px] 2xl:min-w-0 2xl:text-[9px]">
                <colgroup>
                  <col className="w-[3%]" />
                  <col className="w-[15%]" />
                  <col className="w-[9%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                  <col className="w-[8%]" />
                  <col className="w-[10%]" />
                  <col className="w-[12%]" />
                  <col className="w-[12%]" />
                  <col className="w-[13%]" />
                </colgroup>

                <thead className="sticky top-0 z-10 bg-[#082137] text-[9px] uppercase text-white/70">
                  <tr>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      <input type="checkbox" className="accent-blue-600" />
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Person
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Employee ID
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Department
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Role
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Status
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Face Quality
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Enrolled On
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Last Seen
                    </th>
                    <th className="border-b border-[#123250] px-1 py-2 2xl:px-1.5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPeople.map((person) => (
                    <tr
                      key={person.id}
                      onClick={() => setSelectedPerson(person)}
                      className="cursor-pointer border-b border-[#123250]/80 hover:bg-[#0b2238]/70"
                    >
                      <td className="px-1 py-1.5 2xl:px-1.5">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>

                      <td className="px-1 py-1.5 2xl:px-1.5">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="h-5 w-5 shrink-0 rounded object-cover ring-1 ring-[#123250] 2xl:h-6 2xl:w-6"
                          />
                          <span className="min-w-0 truncate font-medium text-white">
                            {person.name}
                          </span>
                        </div>
                      </td>

                      <td className="truncate px-1 py-1.5 2xl:px-1.5 text-white/80">
                        {person.employeeId}
                      </td>
                      <td className="truncate px-1 py-1.5 2xl:px-1.5 text-white/80">
                        {person.department}
                      </td>
                      <td className="truncate px-1 py-1.5 2xl:px-1.5 text-white/80">
                        {person.role}
                      </td>
                      <td className="px-1 py-1.5 2xl:px-1.5">
                        <StatusBadge status={person.status} />
                      </td>
                      <td className="px-1 py-1.5 2xl:px-1.5">
                        <QualityText value={person.faceQuality} />
                      </td>
                      <td className="whitespace-pre-line px-1 py-1.5 2xl:px-1.5 text-white/75">
                        {person.enrolledOn}
                      </td>
                      <td className="whitespace-pre-line px-1 py-1.5 2xl:px-1.5 text-white/75">
                        {person.lastSeen}
                      </td>
                      <td className="px-1 py-1.5 2xl:px-1.5">
                        <div className="flex flex-wrap gap-1">
                          <ActionButton icon={Eye} />
                          <ActionButton icon={Edit} />
                          <ActionButton icon={RefreshCw} color="blue" />
                          <ActionButton icon={Power} color="red" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex shrink-0 flex-col gap-2 border-t border-[#123250] px-3 py-2 text-[10px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <p>Showing 1 to 10 of 1,156 entries</p>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`grid h-6 w-6 place-items-center rounded border border-[#123250] text-[10px] ${
                      page === 1
                        ? "bg-blue-700 text-white"
                        : "bg-[#020817] hover:bg-[#0b2238]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1">...</span>
                <button className="grid h-6 w-9 place-items-center rounded border border-[#123250] bg-[#020817] text-[10px] hover:bg-[#0b2238]">
                  116
                </button>
              </div>
            </div>
          </div>

          <div className="grid max-h-[520px] gap-2 overflow-y-auto lg:hidden">
            {filteredPeople.map((person) => (
              <MobilePersonCard
                key={person.id}
                person={person}
                onClick={() => setSelectedPerson(person)}
              />
            ))}
          </div>
        </div>

        <aside className="flex h-auto min-h-[630px] flex-col overflow-hidden rounded-lg border border-[#123250] bg-[#061421]/90 p-2 shadow-lg lg:h-[calc(100vh-180px)] 2xl:h-[calc(100vh-210px)]">
          <div className="mb-2 flex shrink-0 items-center justify-between">
            <h2 className="text-[12px] font-semibold text-white">
              Person Details
            </h2>
            <button className="text-white/70 hover:text-white">
              <X size={15} />
            </button>
          </div>

          <div className="relative shrink-0 overflow-hidden rounded-md">
            <img
              src={selectedPerson.image}
              alt={selectedPerson.name}
              className="h-36 w-full object-cover"
            />
          </div>

          <div className="mt-2 flex shrink-0 items-center justify-between gap-2">
            <StatusBadge status={selectedPerson.status} />
            <p className="text-[9px] text-white/70">
              Face Quality:{" "}
              <span className="font-bold text-emerald-400">
                {selectedPerson.faceQuality}%
              </span>
            </p>
          </div>

          <div className="mt-3 shrink-0 space-y-1.5 border-b border-[#123250] pb-3 text-[10px]">
            {[
              ["Full Name", selectedPerson.name],
              ["Employee ID", selectedPerson.employeeId],
              ["Department", selectedPerson.department],
              ["Role / Access", selectedPerson.role],
              ["Mobile", selectedPerson.mobile],
              ["Email", selectedPerson.email],
              ["Enrolled On", selectedPerson.enrolledOn.replace("\n", ", ")],
              ["Last Seen", selectedPerson.lastSeen.replace("\n", ", ")],
              ["Camera", selectedPerson.camera],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[78px_1fr] gap-2">
                <span className="text-white/60">{label}</span>
                <span className="break-words text-white/85">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 shrink-0">
            <h3 className="mb-2 text-[11px] font-semibold text-white">
              Quick Actions
            </h3>

            <div className="space-y-1.5">
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-blue-700 text-[10px] font-semibold hover:bg-blue-600">
                <Eye size={13} />
                View Details
              </button>

              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#123250] bg-[#020817] text-[10px] hover:bg-[#0b2238]">
                <Edit size={13} />
                Edit Person
              </button>

              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-amber-500/70 bg-amber-500/10 text-[10px] font-semibold text-amber-400 hover:bg-amber-500/20">
                <RefreshCw size={13} />
                Re-enroll Face
              </button>

              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-red-500/70 bg-red-500/10 text-[10px] font-semibold text-red-400 hover:bg-red-500/20">
                <Power size={13} />
                Deactivate Face Access
              </button>

              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-violet-500/70 bg-violet-500/10 text-[10px] font-semibold text-violet-400 hover:bg-violet-500/20">
                <ArchiveRestore size={13} />
                Archive Person
              </button>

              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-red-500/70 bg-red-500/10 text-[10px] font-semibold text-red-400 hover:bg-red-500/20">
                <Trash2 size={13} />
                Delete Permanently
              </button>
            </div>
          </div>

          <p className="mt-3 shrink-0 text-[11px] leading-4 text-white/60">
            Note: Deactivated persons cannot access the system. Archived records
            are kept for audit purposes.
          </p>
        </aside>
      </section>
    </main>
  );
}