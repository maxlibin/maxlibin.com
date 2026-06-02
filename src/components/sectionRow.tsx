import React from "react"

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-medium uppercase tracking-wider text-faint mb-3">
    {children}
  </h2>
)

type RowProps = {
  left: React.ReactNode
  right?: React.ReactNode
}

export const Row = ({ left, right }: RowProps) => (
  <div className="flex items-baseline justify-between gap-6 py-2.5 border-b border-line last:border-b-0">
    <div className="text-[15px] text-fg min-w-0">{left}</div>
    {right != null && (
      <div className="text-[13px] text-faint whitespace-nowrap tabular-nums shrink-0">
        {right}
      </div>
    )}
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
