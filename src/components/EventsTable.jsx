import { CheckCircle, XCircle, Eye } from "lucide-react";
import { events } from "../data/dashboardData";

const columns = [
  { label: "Time", width: "w-[13%]" },
  { label: "Camera", width: "w-[15%]" },
  { label: "Event", width: "w-[14%]" },
  { label: "Person Name", width: "w-[14%]" },
  { label: "Helmet", width: "w-[8%]" },
  { label: "Vest", width: "w-[7%]" },
  { label: "Object ID", width: "w-[10%]" },
  { label: "Status", width: "w-[11%]" },
  { label: "Evidence", width: "w-[8%]" },
];

function CellText({ children }) {
  const value = children || "—";

  return (
    <span title={String(value)} className="block truncate">
      {value}
    </span>
  );
}

function YesNo({ value }) {
  const yes = value === "Yes";
  const finalValue = value || "No";

  return (
    <span
      title={finalValue}
      className={`inline-flex max-w-full items-center gap-0.5 truncate whitespace-nowrap text-[8.5px] font-semibold sm:text-[9px] ${
        yes ? "text-green-400" : "text-red-400"
      }`}
    >
      {yes ? (
        <CheckCircle size={9} className="shrink-0" />
      ) : (
        <XCircle size={9} className="shrink-0" />
      )}
      <span className="truncate">{finalValue}</span>
    </span>
  );
}

function StatusBadge({ value }) {
  const finalValue = value || "Unresolved";

  return (
    <span
      title={finalValue}
      className="inline-block max-w-full truncate rounded bg-red-700/80 px-1 py-[2px] text-[7.5px] font-semibold text-white sm:text-[8px]"
    >
      {finalValue}
    </span>
  );
}

export default function EventsTable() {
  return (
    <section className="glass-card mt-2 h-[180px] w-full min-w-0 overflow-hidden p-2">
      {/* Header */}
      <div className="mb-1.5 flex h-[16px] items-center justify-between gap-2">
        <h3 className="truncate text-[11px] font-semibold text-white">
          Live Events
        </h3>

        <button className="shrink-0 text-[9px] text-white/80 hover:text-white">
          View All Events ›
        </button>
      </div>

      {/* Table wrapper */}
      <div className="h-[132px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-[#123250]">
        <table className="w-full table-fixed border-collapse text-left text-[8.5px] sm:text-[9px]">
          <thead className="sticky top-0 z-10 bg-[#082136] text-white/70">
            <tr className="h-[24px]">
              {columns.map((column) => (
                <th
                  key={column.label}
                  title={column.label}
                  className={`${column.width} truncate whitespace-nowrap border-r border-[#123250] px-1 py-1 font-semibold last:border-r-0 sm:px-1.5`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {events.length > 0 ? (
              events.slice(0, 4).map((row, index) => {
                const time = row.time || row[0];
                const camera = row.camera || row[1];
                const event = row.event || row[2];
                const personName = row.personName || row.name || row[3];
                const helmet = row.helmet || row[4];
                const vest = row.vest || row[5];
                const objectId = row.objectId || row[6];
                const status = row.status || "Unresolved";

                return (
                  <tr
                    key={`${objectId || index}-${index}`}
                    className="h-[27px] border-t border-[#123250] bg-[#051828]/80 text-white/85 hover:bg-[#0b2238]"
                  >
                    <td className="px-1 py-1 sm:px-1.5">
                      <CellText>{time}</CellText>
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <CellText>{camera}</CellText>
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <CellText>{event}</CellText>
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <CellText>{personName}</CellText>
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <YesNo value={helmet} />
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <YesNo value={vest} />
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <CellText>{objectId}</CellText>
                    </td>

                    <td className="px-1 py-1 sm:px-1.5">
                      <StatusBadge value={status} />
                    </td>

                    <td className="px-1 py-1 text-center sm:px-1.5">
                      <button
                        type="button"
                        title="View evidence"
                        className="inline-flex h-5 w-7 items-center justify-center rounded bg-white/10 text-white/70 hover:bg-white/20 hover:text-white sm:w-8"
                      >
                        <Eye size={10} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-[105px] text-center text-[11px] text-white/50"
                >
                  No live events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="mt-1.5 h-[14px] truncate text-[9px] text-white/60">
        Showing {events.length === 0 ? 0 : 1} to {Math.min(events.length, 4)} of{" "}
        {events.length} events
      </p>
    </section>
  );
}