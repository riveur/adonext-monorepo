type DashboardTitleProps = {
  title: string;
}

export default function DashboardTitle({ title }: DashboardTitleProps) {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
    </div>
  );
}
