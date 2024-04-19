type DashboardTitleProps = {
  children: React.ReactNode;
}

export default function DashboardTitle({ children }: DashboardTitleProps) {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{children}</h1>
    </div>
  );
}
