// import mongoose from "mongoose";
// import model from "./model.js";
// import "dotenv/config";

// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

// mongoose.connect(CONNECTION_STRING);

// const samplePosts = [
//     // RS101 - Rocket Propulsion posts
//     {
//         title: "Clarification on specific impulse calculation",
//         content: `Hello everyone,\n\nI'm working on the propulsion theory problems and I'm confused about specific impulse calculation.\n\nThe formula I_ sp = v_e / g_0 - does g_0 refer to standard gravity (9.81 m/s²) or local gravity at the launch site?\n\nAlso, for multi-stage rockets, do we calculate I_sp for each stage separately?`,
//         course: "RS101",
//         category: "Clarification",
//         author: {
//             _id: "anon_prop_001",
//             name: "Anonymous Propellant",
//             role: "student"
//         },
//         tags: ["propulsion", "theory"],
//         isPinned: false,
//         isInstructor: false,
//         views: 78,
//         likes: 3,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Always use standard gravity (9.81 m/s²) for specific impulse calculations. For multi-stage rockets, each stage has its own I_sp based on its engine characteristics.",
//                 author: {
//                     _id: "prof_rocket_001",
//                     name: "Dr. Elena Vasquez",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 12,
//                 createdAt: new Date("2025-11-28T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-25T09:00:00Z"),
//         updatedAt: new Date("2025-11-28T10:00:00Z")
//     },

//     // RS102 - Aerodynamics posts
//     {
//         title: "Lift coefficient confusion for NACA airfoils",
//         content: `Working on the airfoil design lab and I'm getting different lift coefficients than the expected values for NACA 2412.\n\nAt alpha = 4°, my calculation gives CL = 0.52 but the reference table shows 0.48. Am I missing a Reynolds number correction?\n\nAny tips on airfoil data lookup?`,
//         course: "RS102",
//         category: "Bug",
//         author: {
//             _id: "student_aero_001",
//             name: "Alex Rivera",
//             role: "student"
//         },
//         tags: ["airfoils", "labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 112,
//         likes: 2,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Check your Reynolds number - NACA tables are typically for Re = 9×10^6. You might need to apply a correction factor for lower Re.",
//                 author: {
//                     _id: "ta_aero_001",
//                     name: "Sarah Patel",
//                     role: "ta"
//                 },
//                 isAnswer: true,
//                 likes: 8,
//                 createdAt: new Date("2025-11-27T14:30:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-26T11:00:00Z"),
//         updatedAt: new Date("2025-11-27T14:30:00Z")
//     },

//     // RS103 - Spacecraft Design posts
//     {
//         title: "Thermal control system design question",
//         content: `For the spacecraft design project, I'm working on the thermal control system.\n\nThe problem states the satellite will be in LEO with beta angle of 30°. Should I size the radiators for maximum solar flux or average conditions?\n\nAlso confused about MLIs - multilayer insulation effectiveness calculation.`,
//         course: "RS103",
//         category: "Concept",
//         author: {
//             _id: "student_space_001",
//             name: "Jordan Lee",
//             role: "student"
//         },
//         tags: ["thermal", "project"],
//         isPinned: false,
//         isInstructor: false,
//         views: 95,
//         likes: 4,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Size radiators for worst-case hot case (beta = 0°). MLIs typically give ε_eff = 0.03-0.05 depending on layers. Check Gilmore's Spacecraft Thermal Control Handbook.",
//                 author: {
//                     _id: "prof_space_001",
//                     name: "Dr. Marcus Chen",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 15,
//                 createdAt: new Date("2025-11-20T16:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-20T14:00:00Z"),
//         updatedAt: new Date("2025-11-20T16:00:00Z")
//     },

//     // RS104 - Organic Chemistry posts
//     {
//         title: "SN2 reaction mechanism clarification",
//         content: `In the organic chemistry lab, we're doing an SN2 reaction. The mechanism diagram shows backside attack but my 3D model shows steric hindrance.\n\nIs the transition state really pentacoordinate or is it concerted? Also, why does polar aprotic solvent increase rate so much?`,
//         course: "RS104",
//         category: "Concept",
//         author: {
//             _id: "anon_org_001",
//             name: "Anonymous Organic",
//             role: "student"
//         },
//         tags: ["mechanisms", "SN2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 89,
//         likes: 5,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "It's concerted - no true pentacoordinate intermediate. Polar aprotic solvents solvate the nucleophile poorly, making it more reactive (naked anion).",
//                 author: {
//                     _id: "prof_org_001",
//                     name: "Dr. Rachel Kim",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 11,
//                 createdAt: new Date("2025-11-22T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-21T15:00:00Z"),
//         updatedAt: new Date("2025-11-22T10:00:00Z")
//     },

//     // RS105 - Inorganic Chemistry posts
//     {
//         title: "Crystal field splitting for octahedral complexes",
//         content: `Struggling with crystal field theory problem set.\n\neg, [Co(NH3)6]3+ is yellow, [Co(H2O)6]3+ is blue.\n\nNH3 is stronger field ligand than H2O so Δ_o should be larger for ammine complex. But yellow means smaller Δ_o (red light absorbed)? This contradicts ligand field strength.`,
//         course: "RS105",
//         category: "Concept",
//         author: {
//             _id: "student_inorg_001",
//             name: "Maya Singh",
//             role: "student"
//         },
//         tags: ["CFT", "spectroscopy"],
//         isPinned: false,
//         isInstructor: false,
//         views: 67,
//         likes: 2,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "You're mixing absorption and transmission colors. Yellow solution transmits yellow light (absorbs violet/blue). Larger Δ_o = higher energy transition = shorter wavelength absorbed = yellow transmitted.",
//                 author: {
//                     _id: "ta_inorg_001",
//                     name: "David Wu",
//                     role: "ta"
//                 },
//                 isAnswer: true,
//                 likes: 9,
//                 createdAt: new Date("2025-11-24T13:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-23T11:00:00Z"),
//         updatedAt: new Date("2025-11-24T13:00:00Z")
//     },

//     // RS106 - Physical Chemistry posts
//     {
//         title: "Partition function calculation confusion",
//         content: `Problem set 3 question 2b - calculating partition function for diatomic molecule.\n\nq_trans = (2πmkT/h²)^(3/2) * V\n\nDo we use reduced mass μ or individual atomic masses m1, m2? Also, what's the reference energy for q_vib?`,
//         course: "RS106",
//         category: "Clarification",
//         author: {
//             _id: "student_phys_001",
//             name: "Ethan Park",
//             role: "student"
//         },
//         tags: ["stat_therm", "partition"],
//         isPinned: false,
//         isInstructor: false,
//         views: 54,
//         likes: 1,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Always use reduced mass μ = m1m2/(m1+m2) for q_trans of diatomic. q_vib reference is zero-point energy (1/2 hν).",
//                 author: {
//                     _id: "prof_phys_001",
//                     name: "Dr. Laura Bennett",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 7,
//                 createdAt: new Date("2025-11-19T09:30:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-18T14:00:00Z"),
//         updatedAt: new Date("2025-11-19T09:30:00Z")
//     },

//     // RS107 - Middle-earth Languages posts (Instructor announcement)
//     {
//         title: " Tengwar Writing Assignment Guidelines",
//         content: `Class,\n\nFor the Tengwar transcription assignment due Friday:\n\n• Use Classical Quenya mode (not Late Quenya)\n• Include proper vowel tehtar placement\n• Carrier úre for final vowels\n• Submit both digital rendering and handwritten version\n\nReference: Parma Eldalamberon 22. Tengwar handout posted in Resources.\n\nOffice hours tomorrow 2-4 PM if you need help with transcription.`,
//         course: "RS107",
//         category: "Clarification",
//         author: {
//             _id: "prof_tolkien_001",
//             name: "Prof. Christopher Tolkien",
//             role: "instructor"
//         },
//         tags: ["tengwar", "assignment"],
//         isPinned: true,
//         isInstructor: true,
//         views: 189,
//         likes: 8,
//         bookmarked: [],
//         starred: [],
//         followups: [],
//         createdAt: new Date("2025-11-27T10:00:00Z"),
//         updatedAt: new Date("2025-11-27T10:00:00Z")
//     },

//     // RS108 - Middle-earth Diplomacy posts
//     {
//         title: "Council of Elrond - Diplomacy Analysis",
//         content: `For Thursday's discussion section, prepare analysis of Council of Elrond (FotR Book II Ch. 2):\n\n1. Why did Elrond choose Frodo over Boromir/Isildur's heir?\n2. What diplomatic principles does Gandalf employ?\n3. How does Aragorn's silence influence the outcome?\n\nPrimary sources: Unfinished Tales "The Council of Elrond".\n\nLooking forward to your insights!`,
//         course: "RS108",
//         category: "Other",
//         author: {
//             _id: "ta_middleearth_001",
//             name: "TA Eowyn",
//             role: "ta"
//         },
//         tags: ["discussion", "elrond"],
//         isPinned: true,
//         isInstructor: false,
//         views: 234,
//         likes: 22,
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Is the Appendix A version of the Council sufficient, or do we need UT specifically?",
//                 author: {
//                     _id: "student_fellowship_001",
//                     name: "Samwise G.",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 5,
//                 createdAt: new Date("2025-11-29T11:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-28T14:00:00Z"),
//         updatedAt: new Date("2025-11-29T11:00:00Z")
//     }
// ];

// async function seedPosts() {
//     try {
//         console.log("Connected to MongoDB");
//         console.log("Clearing existing posts...");

//         // Optional: Clear existing posts (comment out if you want to keep existing data)
//         await model.deleteMany({});

//         console.log("Inserting sample posts...");
//         const result = await model.insertMany(samplePosts);

//         console.log(`Successfully inserted ${result.length} posts!`);
//         console.log("Sample data:");
//         result.forEach(post => {
//             console.log(`- ${post.title} (${post.course}: ${post.tags.join(', ')})`);
//         });

//         mongoose.connection.close();
//         console.log("\nDatabase connection closed. Seed complete!");
//     } catch (error) {
//         console.error("Error seeding database:", error);
//         mongoose.connection.close();
//     }
// }

// seedPosts();
