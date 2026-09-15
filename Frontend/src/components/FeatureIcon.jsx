import { Car, Zap, Headphones } from "lucide-react";

const ICONS = {
  car: Car,
  zap: Zap,
  headphones: Headphones,
};

export default function FeatureIcon({ name, className = "" }) {
  const Icon = ICONS[name] ?? Car;
  return <Icon className={className} strokeWidth={1.8} />;
}
