export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-dvh flex-1">{children}</div>;
}
