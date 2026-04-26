export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
