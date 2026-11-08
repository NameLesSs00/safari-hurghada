export type Destination = {
  id: string;
  name: string;
  tripsCount: number;
  image: string;
};

export const destinations: Destination[] = [
  {
    id: "hurghada",
    name: "Hurghada",
    tripsCount: 10,
    image: "/AboutUs/ImageAboutus.png",
  },
  {
    id: "giza",
    name: "Giza",
    tripsCount: 10,
    image: "/AboutUs/HeroAboutUs.png",
  },
  {
    id: "aswan",
    name: "Aswan",
    tripsCount: 10,
    image: "/AboutUs/worldAboutus.png",
  },
  {
    id: "luxor",
    name: "Luxor",
    tripsCount: 10,
    image: "/AboutUs/ImageAboutus.png",
  },
  {
    id: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    tripsCount: 10,
    image: "/AboutUs/HeroAboutUs.png",
  },
  {
    id: "dahab",
    name: "Dahab",
    tripsCount: 10,
    image: "/AboutUs/worldAboutus.png",
  },
];
