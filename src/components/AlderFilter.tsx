import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { alders } from "@/data/alders";

interface AlderFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function AlderFilter({ value, onChange }: AlderFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Filter by alder..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Alders</SelectItem>
        {alders.map((alder) => (
          <SelectItem key={alder.district} value={alder.district.toString()}>
            District {alder.district} - {alder.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
