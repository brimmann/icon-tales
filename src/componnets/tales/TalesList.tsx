import TaleItem from "./TaleItem";

function TalesList() {
  const taleTitles = [
    "The Enchanted Forest",
    "The Last Dragon",
    "Whispers of the Old Mill",
    "The Secret of Starfall Mountain",
    "Chronicles of the Moonlit Shore",
    "The Weaver's Dream",
    "Echoes in the Stone",
    "The Crimson Rose Prophecy",
    "Beneath the Sleeping City",
    "The Voyage of the Stardust Mariner",
  ];

  return (
    <div>
      {taleTitles.map((title, index) => (
        <TaleItem key={index} tale={title} />
      ))}
    </div>
  );
}

export default TalesList;
