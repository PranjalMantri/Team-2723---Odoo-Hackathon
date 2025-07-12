import ReWearLanding from "./components/ReWearLanding";

const App = () => {
  const item = {
    image:
      "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
    title: "Retro Graphic Tee",
    user: "Jay Mehta",
    category: "Men’s Clothing",
    description:
      "Vintage-inspired graphic t-shirt made from soft, breathable cotton. Lightly used and well-maintained.",
    points: 30,
    listingType: "Swap",
  };
  const mockUser = {
    name: "Sophia Bennett",
    username: "sophia.b",
    joinedYear: 2021,
    avatar:
      "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
    points: 120,
    uploaded: 25,
    swaps: 15,
    items: [
      {
        image:
          "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
        title: "item1",
      },
      {
        image:
          "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
        title: "item2",
      },
    ],
    ongoingSwaps: [
      {
        name: "Olivia",
        details: "Dress for Jacket",
        status: "In Progress",
        image:
          "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
      },
    ],
    completedSwaps: [
      {
        name: "Chloe",
        details: "Blouse for Skirt",
        date: "2023-08-15",
        image:
          "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
      },
    ],
  };

  return (
    <div>
      <ReWearLanding />
    </div>
  );
};
export default App;
