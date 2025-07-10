import type { Tale } from "../types";

export const tales: Tale[] = [
  {
    title: "The Lonely Cog",
    createdAt: new Date("2024-01-15T09:00:00Z"),
    updatedAt: new Date("2024-01-15T11:20:00Z"),
    slides: [
      {
        id: 101,
        order: 1,
        createdAt: new Date("2024-01-15T09:00:00Z"),
        updatedAt: new Date("2024-01-15T09:05:00Z"),
        textBoxes: [
          {
            id: 1001,
            content:
              "In the heart of a great clock, lived a tiny cog. It felt small and unimportant among the giant, swinging pendulums and mighty gears.",
            transform: { x: 40, y: 50, width: 400, height: 150 },
            style: {
              fontSize: "22px",
              textAlign: "center",
              color: "#4A4A4A",
            },
          },
        ],
      },
      {
        id: 102,
        order: 2,
        createdAt: new Date("2024-01-15T09:10:00Z"),
        updatedAt: new Date("2024-01-15T09:15:00Z"),
        textBoxes: [
          {
            id: 1002,
            content:
              "One day, the clock stopped. The great gears groaned, but nothing moved. The timekeepers were baffled.",
            transform: { x: 50, y: 100, width: 380, height: 100 },
            style: {
              fontSize: "26px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#D0021B",
            },
          },
        ],
      },
      {
        id: 103,
        order: 3,
        createdAt: new Date("2024-01-15T09:20:00Z"),
        updatedAt: new Date("2024-01-15T09:25:00Z"),
        textBoxes: [
          {
            id: 1003,
            content:
              "The tiny cog saw what the others couldn't: a single grain of sand, wedged in a critical joint. It was a place only the smallest cog could reach.",
            transform: { x: 30, y: 80, width: 420, height: 120 },
            style: {
              fontSize: "20px",
              fontStyle: "italic",
              textAlign: "left",
              color: "#4A90E2",
            },
          },
          {
            id: 1004,
            content:
              "With a mighty effort, it nudged the sand out. The great clock sprang to life, and the little cog knew its true worth.",
            transform: { x: 30, y: 220, width: 420, height: 100 },
            style: {
              fontSize: "20px",
              fontStyle: "italic",
              textAlign: "left",
              color: "#4A90E2",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Echoes of the Void",
    createdAt: new Date("2024-02-20T16:00:00Z"),
    updatedAt: new Date("2024-02-21T10:00:00Z"),
    slides: [
      {
        id: 201,
        order: 1,
        createdAt: new Date("2024-02-20T16:00:00Z"),
        updatedAt: new Date("2024-02-20T16:05:00Z"),
        textBoxes: [
          {
            id: 2001,
            content:
              "Captain Eva drifted. Her ship, the 'Stardust Drifter', was a silent shadow against the tapestry of a thousand unknown stars. The comms were dead.",
            transform: { x: 25, y: 70, width: 450, height: 130 },
            style: {
              fontSize: "24px",
              color: "#E5E5E5",
              textAlign: "left",
            },
          },
        ],
      },
      {
        id: 202,
        order: 2,
        createdAt: new Date("2024-02-21T09:30:00Z"),
        updatedAt: new Date("2024-02-21T09:35:00Z"),
        textBoxes: [
          {
            id: 2002,
            content:
              "A signal. Not radio, but a pattern in the cosmic radiation. A soft, rhythmic pulse from a nearby gas giant.",
            transform: { x: 60, y: 120, width: 380, height: 100 },
            style: {
              fontSize: "28px",
              fontWeight: "300",
              fontStyle: "italic",
              textAlign: "center",
              color: "#50E3C2",
            },
          },
        ],
      },
    ],
  },
  {
    title: "The Sunken City of Keys",
    createdAt: new Date("2024-03-10T08:00:00Z"),
    updatedAt: new Date("2024-03-11T14:30:00Z"),
    slides: [
      {
        id: 301,
        order: 1,
        createdAt: new Date("2024-03-10T08:00:00Z"),
        updatedAt: new Date("2024-03-10T08:05:00Z"),
        textBoxes: [
          {
            id: 3001,
            content:
              "Below the waves, where light struggles to reach, lies the city of Aquoria. Legend says it was locked away by its creators, its secrets guarded by three ethereal keys.",
            transform: { x: 50, y: 60, width: 400, height: 150 },
            style: { fontSize: "24px", color: "#B8E986", textAlign: "center" },
          },
        ],
      },
      {
        id: 302,
        order: 2,
        createdAt: new Date("2024-03-11T14:20:00Z"),
        updatedAt: new Date("2024-03-11T14:25:00Z"),
        textBoxes: [
          {
            id: 3002,
            content:
              "A young historian named Kael, armed with an old map, found the first key shimmering in a coral cave. As he touched it, the city hummed with a forgotten energy.",
            transform: { x: 30, y: 150, width: 430, height: 120 },
            style: {
              fontSize: "22px",
              color: "#F8E71C",
              fontStyle: "italic",
              textAlign: "left",
            },
          },
        ],
      },
    ],
  },
  {
    title: "The Last Spellweaver",
    createdAt: new Date("2024-04-05T18:30:00Z"),
    updatedAt: new Date("2024-04-05T19:00:00Z"),
    slides: [
      {
        id: 401,
        order: 1,
        createdAt: new Date("2024-04-05T18:30:00Z"),
        updatedAt: new Date("2024-04-05T18:35:00Z"),
        textBoxes: [
          {
            id: 4001,
            content:
              "Elara was the last. In a world of steam and iron, her ancient magic was a fading whisper. She lived in a crooked cottage at the edge of a forgotten wood.",
            transform: { x: 40, y: 90, width: 410, height: 110 },
            style: { fontSize: "25px", color: "#7ED321", textAlign: "left" },
          },
        ],
      },
      {
        id: 402,
        order: 2,
        createdAt: new Date("2024-04-05T18:45:00Z"),
        updatedAt: new Date("2024-04-05T18:50:00Z"),
        textBoxes: [
          {
            id: 4002,
            content:
              "A girl with eyes full of hope knocked on her door. 'Teach me a spell,' she pleaded, 'a real one.' Elara smiled, a rare and gentle thing.",
            transform: { x: 70, y: 130, width: 360, height: 100 },
            style: { fontSize: "23px", color: "#F5A623", textAlign: "center" },
          },
        ],
      },
      {
        id: 403,
        order: 3,
        createdAt: new Date("2024-04-05T18:55:00Z"),
        updatedAt: new Date("2024-04-05T19:00:00Z"),
        textBoxes: [
          {
            id: 4003,
            content:
              "She didn't teach incantations. She taught the girl to listen to the trees, to feel the rhythm of the rain, to see the magic in a simple act of kindness. The truest magic of all.",
            transform: { x: 20, y: 100, width: 450, height: 150 },
            style: {
              fontSize: "21px",
              color: "#BD10E0",
              fontStyle: "italic",
              textAlign: "justify",
            },
          },
        ],
      },
    ],
  },
];
