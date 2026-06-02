import React from "react"

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-medium uppercase tracking-wider text-faint mb-3">
    {children}
  </h2>
)

type RowProps = {
  meta?: React.ReactNode
  children: React.ReactNode
}

// ReadCV-style row: a narrow faint meta column on the left (date / years /
// platform / label) and the primary content on the right.
export const Row = ({ meta, children }: RowProps) => (
  <div className="flex gap-4 sm:gap-8 py-3 border-b border-line last:border-b-0">
    <div className="w-24 sm:w-28 shrink-0 text-[13px] leading-6 text-faint tabular-nums">
      {meta}
    </div>
    <div className="flex-1 min-w-0 text-[15px] leading-6 text-fg">{children}</div>
  </div>
)

export const Section = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <section className="mt-14">
    <SectionLabel>{label}</SectionLabel>
    <div>{children}</div>
  </section>
)
