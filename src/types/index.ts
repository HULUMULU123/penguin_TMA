export interface Photo {
  id: string;
  url: string;
  name: string;
  category: string;
}

export interface Filter {
  id: string;
  name: string;
  icon: string;
  type: "face" | "tool" | "background";
}
