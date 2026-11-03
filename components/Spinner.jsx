import { ApertureIcon } from "./Logo";

export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-primary">
      <ApertureIcon className="h-12 w-12 animate-spin" />
      <p className="text-sm text-base-content/70">{label}</p>
    </div>
  );
}