import {
  Archive,
  Image,
  User,
  Trash2,
  Search,
  Filter,
  CalendarDays,
  Eye,
  RotateCcw,
  Database,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown,
  Info,
} from "lucide-react";

const archivedItems = [
  {
    name: "PPE_Detection_v0.8",
    badge: "Dataset",
    icon: Database,
    iconColor: "from-violet-700 to-purple-500",
    type: "PPE Detection",
    description: "Helmet, Vest, Person, No Helmet, No Vest",
    images: "8,245",
    classes: "5",
    archivedOn: "20 Apr 2026\n11:35 AM",
    archivedBy: "Super Admin",
  },
  {
    name: "Helmet_Detection_v0.5",
    badge: "Dataset",
    icon: Database,
    iconColor: "from-emerald-700 to-green-500",
    type: "PPE Detection",
    description: "Helmet / No Helmet detection",
    images: "3,125",
    classes: "2",
    archivedOn: "18 Apr 2026\n02:20 PM",
    archivedBy: "Amit Singh",
  },
  {
    name: "Face_Dataset_Enrolled_v1",
    badge: "Dataset",
    icon: Database,
    iconColor: "from-red-700 to-red-500",
    type: "Face Dataset",
    description: "Faces of enrolled persons",
    images: "5,210",
    classes: "1",
    archivedOn: "15 Apr 2026\n09:15 AM",
    archivedBy: "Super Admin",
  },
  {
    name: "John_Miller",
    badge: "Person",
    icon: User,
    iconColor: "from-orange-600 to-yellow-500",
    type: "Person",
    description: "Employee ID: EMP0987",
    images: "32",
    classes: "-",
    archivedOn: "12 Apr 2026\n04:40 PM",
    archivedBy: "HR System",
  },
  {
    name: "Ramesh_Yadav",
    badge: "Person",
    icon: User,
    iconColor: "from-green-700 to-emerald-500",
    type: "Person",
    description: "Employee ID: EMP0678",
    images: "28",
    classes: "-",
    archivedOn: "10 Apr 2026\n01:05 PM",
    archivedBy: "Amit Singh",
  },
  {
    name: "Ramesh_Yadav",
    badge: "Person",
    icon: User,
    iconColor: "from-green-700 to-emerald-500",
    type: "Person",
    description: "Employee ID: EMP0678",
    images: "28",
    classes: "-",
    archivedOn: "10 Apr 2026\n01:05 PM",
    archivedBy: "Amit Singh",
  },
  {
    name: "Ramesh_Yadav",
    badge: "Person",
    icon: User,
    iconColor: "from-green-700 to-emerald-500",
    type: "Person",
    description: "Employee ID: EMP0678",
    images: "28",
    classes: "-",
    archivedOn: "10 Apr 2026\n01:05 PM",
    archivedBy: "Amit Singh",
  },
  {
    name: "Ramesh_Yadav",
    badge: "Person",
    icon: User,
    iconColor: "from-green-700 to-emerald-500",
    type: "Person",
    description: "Employee ID: EMP0678",
    images: "28",
    classes: "-",
    archivedOn: "10 Apr 2026\n01:05 PM",
    archivedBy: "Amit Singh",
  },
  {
    name: "Michael_Brown",
    badge: "Person",
    icon: User,
    iconColor: "from-slate-600 to-slate-500",
    type: "Person",
    description: "Contractor",
    images: "18",
    classes: "-",
    archivedOn: "01 Apr 2026\n05:40 PM",
    archivedBy: "System",
  },
  
  {
    name: "Michael_Brown",
    badge: "Person",
    icon: User,
    iconColor: "from-slate-600 to-slate-500",
    type: "Person",
    description: "Contractor",
    images: "18",
    classes: "-",
    archivedOn: "01 Apr 2026\n05:40 PM",
    archivedBy: "System",
  },
];

const classData = [
  ["Helmet", "2,125", "25.8%"],
  ["Vest", "2,018", "24.5%"],
  ["Person", "1,875", "22.8%"],
  ["No Helmet", "1,342", "16.3%"],
  ["No Vest", "885", "10.6%"],
];

function StatCard({ icon: Icon, title, value, subtitle, color }) {
  return (
    <div className="min-h-[64px] rounded-lg border border-[#17324a] bg-[#061421]/90 px-2 py-2">
      <div className="flex h-full items-center gap-3">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br ${color}`}
        >
          <Icon size={21} className="text-white" />
        </div>

        <div className="min-w-0">
          <p className="line-clamp-2 text-[10px] font-bold uppercase leading-tight text-white/70">
            {title}
          </p>
          <h2 className="mt-1 text-lg font-bold leading-tight text-white">
            {value}
          </h2>
          <p className="truncate text-[10px] text-white/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function ArchivesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#020b14] p-2 text-white lg:p-0.5">
      <div className="grid w-full max-w-full grid-cols-[minmax(0,1fr)_clamp(220px,18vw,260px)] items-start gap-2 overflow-visible">
        <section className="min-w-0 max-w-full space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <StatCard icon={Archive} title="Total Archived Datasets" value="12" subtitle="All Archived" color="from-purple-800 to-violet-500" />
            <StatCard icon={Image} title="Total Archived Images" value="58,742" subtitle="All Archives" color="from-blue-800 to-blue-500" />
            <StatCard icon={User} title="Archived Persons" value="248" subtitle="Inactive / Archived" color="from-orange-600 to-yellow-500" />
            <StatCard icon={Trash2} title="Deleted Records" value="36" subtitle="Permanently Deleted" color="from-red-700 to-red-500" />
          </div>

          <div className="rounded-lg border border-[#17324a] bg-[#061421]/80 p-2">
            <div className="mb-1 grid w-full grid-cols-[auto_minmax(80px,1fr)_auto_auto_auto_auto] items-center gap-1 overflow-hidden pb-1">
              <div className="flex h-9 min-w-0 rounded-md border border-[#17324a] bg-[#020817] text-[10px]">
                <span className="px-1.5 py-2 text-white/80">Type:</span>
                <button className="bg-blue-700 px-2.5">All</button>
                <button className="border-l border-[#17324a] px-2.5 hover:bg-[#0b2238]">Datasets</button>
                <button className="border-l border-[#17324a] px-2.5 hover:bg-[#0b2238]">Persons</button>
              </div>

              <div className="flex h-9 min-w-0 items-center gap-1 rounded-md border border-[#17324a] bg-[#020817] px-1.5">
                <Search size={14} className="text-white/70" />
                <input
                  placeholder="Search by name or description..."
                  className="w-full min-w-0 bg-transparent text-[10px] text-white outline-none placeholder:text-white/50"
                />
              </div>

              <button className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-md border border-[#17324a] bg-[#020817] px-1.5 text-[10px] whitespace-nowrap">
                <span>Status:</span><span>All</span> <ChevronDown size={12} />
              </button>

              <button className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-md border border-[#17324a] bg-[#020817] px-1.5 text-[10px] whitespace-nowrap">
                <span>Archived:</span><span>All</span> <ChevronDown size={12} />
              </button>

              <button className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-md border border-[#17324a] bg-[#020817] px-1.5 text-[10px] whitespace-nowrap">
                <CalendarDays size={12} /> <span className="truncate">23 Apr 2026</span>
              </button>

              <button className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-md border border-[#17324a] bg-[#020817] px-1.5 text-[10px] whitespace-nowrap">
                <Filter size={12} /> <span>Filters</span>
              </button>
            </div>

            <div className="h-[calc(100vh-310px)] min-h-[400px] max-h-[590px] rounded-md border border-[#17324a] overflow-hidden">
              <div className="h-full w-full overflow-auto">
                <table className="w-full min-w-[1050px] table-fixed text-left text-[10px]">
                  <thead className="sticky top-0 z-10 bg-[#082035] text-white">
                    <tr>
                      <th className="w-[40px] p-1">
                        <input type="checkbox" />
                      </th>
                      <th className="w-[160px] p-2">Name</th>
                      <th className="w-[90px] p-2">Type</th>
                      <th className="w-[150px] p-2">Description</th>
                      <th className="w-[100px] p-2">Images / Classes</th>
                      <th className="w-[130px] p-2">
                        Archived On <ArrowDown size={14} className="inline" />
                      </th>
                      <th className="w-[110px] p-2">Archived By</th>
                      <th className="w-[90px] p-2">Status</th>
                      <th className="w-[130px] p-2">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {archivedItems.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <tr
                          key={`${item.name}-${index}`}
                          className="border-t border-[#17324a] bg-[#03111e]/70 hover:bg-[#082035]"
                        >
                          <td className="p-1"><input type="checkbox" /></td>

                          <td className="p-1">
                            <div className="flex min-w-0 items-center gap-2">
                              <div className={`grid h-6 w-6 shrink-0 place-items-center rounded bg-gradient-to-br ${item.iconColor}`}>
                                <Icon size={17} />
                              </div>

                              <div>
                                <p className="truncate">{item.name}</p>
                                <span
                                  className={`rounded border px-2 py-0.5 text-[10px] ${
                                    item.badge === "Dataset"
                                      ? "border-purple-600 text-purple-300"
                                      : "border-orange-600 text-orange-300"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="truncate p-1 text-[10px]">{item.type}</td>
                          <td className="truncate p-1 text-[10px] text-white/80">{item.description}</td>
                          <td className="truncate p-1 text-[10px]">{item.images} <span className="mx-2">/</span> {item.classes}</td>
                          <td className="whitespace-pre-line p-1">{item.archivedOn}</td>
                          <td className="truncate p-1 text-[10px]">{item.archivedBy}</td>

                          <td className="p-1">
                            <span className="rounded border border-emerald-700 bg-emerald-950/60 px-1.5 py-1 text-emerald-400">
                              Archived
                            </span>
                          </td>

                          <td className="p-1">
                            <div className="flex gap-1">
                              <button className="grid h-6 w-6 place-items-center rounded border border-[#36506a] hover:bg-[#0b2238]">
                                <Eye size={15} />
                              </button>
                              <button className="grid h-6 w-6 place-items-center rounded border border-emerald-700 text-emerald-400 hover:bg-emerald-950">
                                <RotateCcw size={15} />
                              </button>
                              <button className="grid h-6 w-6 place-items-center rounded border border-red-700 text-red-500 hover:bg-red-950">
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-2 text-xs text-white/70">
              <p>Showing 1 to 8 of 12 entries</p>

              <div className="flex items-center gap-1">
                <button className="grid h-8 w-9 place-items-center rounded border border-[#17324a] bg-[#020817]"><ChevronLeft size={16} /></button>
                <button className="grid h-8 w-9 place-items-center rounded bg-blue-700 text-white">1</button>
                <button className="grid h-8 w-9 place-items-center rounded border border-[#17324a] bg-[#020817]">2</button>
                <button className="grid h-8 w-9 place-items-center rounded border border-[#17324a] bg-[#020817]"><ChevronRight size={16} /></button>
              </div>

              <div className="flex items-center gap-2 text-[10px]">
                Rows per page:
                <button className="flex h-8 w-24 items-center justify-between rounded border border-[#17324a] bg-[#020817] px-3">
                  10 <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#17324a] bg-[#061421]/80 p-3">
            <div className="flex gap-3">
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600">
                <Info size={14} />
              </div>

              <div>
                <h3 className="mb-1 text-sm text-white">About Archives</h3>
                <p className="text-[10px] text-white/70">
                  Archived datasets and persons are moved here when they are no longer active but kept for historical reference.
                </p>
                <p className="mt-1 text-[10px] text-white/70">
                  You can restore archived items to make them active again. Deleted items are permanently removed and cannot be recovered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="min-w-0 max-w-full space-y-2 overflow-visible">
          <div className="rounded-lg border border-[#17324a] bg-[#061421]/90 p-2">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Archive Details</h3>
              <X size={18} />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-violet-800 to-purple-500">
                <Database size={23} />
              </div>

              <div>
                <h2 className="truncate text-sm font-semibold">PPE_Detection_v0.8</h2>
                <div className="mt-2 flex gap-2">
                  <span className="rounded border border-purple-600 px-2 py-1 text-[10px] text-purple-300">Dataset</span>
                  <span className="rounded border border-emerald-700 px-2 py-1 text-[10px] text-emerald-400">Archived</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[9px]">
              <Detail label="Description" value="Helmet, Vest, Person, No Helmet, No Vest" />
              <Detail label="Archived On" value="20 Apr 2026 11:35 AM" />
              <Detail label="Archived By" value="Super Admin" />
              <Detail label="Reason" value="New dataset version created" />
              <Detail label="Original Created On" value="10 Apr 2026 10:15 AM" />
            </div>

            <div className="my-3 border-t border-[#17324a]" />

            <div className="space-y-1.5 text-[10px]">
              <DetailRow label="Total Images" value="8,245" large />
              <DetailRow label="Labeled Images" value="7,856 (95.3%)" />
              <DetailRow label="Classes" value="5" />
              <DetailRow
                label="Status"
                value={
                  <span className="rounded border border-emerald-700 px-2 py-1 text-[10px] text-emerald-400">
                    Archived
                  </span>
                }
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#17324a] bg-[#061421]/90 p-2">
            <h3 className="mb-2 text-sm font-semibold">Class Distribution</h3>

            <div className="flex items-center gap-3">
              <div className="relative h-23 w-20 shrink-0 rounded-full bg-[conic-gradient(#16a34a_0_26%,#7c3aed_26%_50%,#f59e0b_50%_73%,#2563eb_73%_89%,#f97316_89%_100%)]">
                <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#061421] text-center leading-none">
                  <p className="text-[10px] font-bold leading-none">8,245</p>
                  <p className="mt-0.5 w-10 text-[8px] font-bold leading-[8px] text-white/60">
                    Total Images
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-1 text-[8px]">
                {classData.map(([name, value, percent], index) => (
                  <div
                    key={name}
                    className="grid grid-cols-[minmax(46px,1fr)_auto] items-start gap-1.5"
                  >
                    <span className="flex min-w-0 items-start gap-1">
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          index === 0
                            ? "bg-green-500"
                            : index === 1
                            ? "bg-violet-600"
                            : index === 2
                            ? "bg-yellow-500"
                            : index === 3
                            ? "bg-blue-600"
                            : "bg-orange-500"
                        }`}
                      />
                      <span className="whitespace-normal break-words leading-tight">
                        {name}
                      </span>
                    </span>

                    <span className="whitespace-nowrap text-white/70">
                      {value} ({percent})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#17324a] bg-[#061421]/90 p-2">
            <h3 className="mb-2 text-sm font-semibold">Actions</h3>

            <div className="space-y-2">
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded bg-blue-700 text-xs font-medium hover:bg-blue-600">
                <Eye size={16} /> View Details
              </button>
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded bg-emerald-700 text-xs font-medium hover:bg-emerald-600">
                <RotateCcw size={16} /> Restore Dataset
              </button>
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded bg-orange-600 text-xs font-medium hover:bg-orange-500">
                <User size={16} /> Restore Person
              </button>
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded bg-red-700 text-xs font-medium hover:bg-red-600">
                <Trash2 size={16} /> Delete Permanently
              </button>
            </div>

            <p className="mt-4 text-xs text-white/60">
              Deleted items cannot be recovered.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-white/60">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, large = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span className={large ? "text-base font-semibold text-white" : "text-white/80"}>
        {value}
      </span>
    </div>
  );
}