// import mongoose from "mongoose";
// import model from "./model.js";
// import { config } from "dotenv";
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Get current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load .env from root directory (two levels up from Pazza folder)
// config({ path: join(__dirname, '../../.env') });

// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

// console.log("Connecting to MongoDB...");
// console.log("Connection string exists:", !!CONNECTION_STRING);
// console.log("First 30 chars:", CONNECTION_STRING?.substring(0, 30) + '...');

// if (!CONNECTION_STRING) {
//     console.error("❌ MONGO_CONNECTION_STRING not found in environment!");
//     console.error("Checked .env at:", join(__dirname, '../../.env'));
//     process.exit(1);
// }

// mongoose.connect(CONNECTION_STRING);

// const samplePosts = [
//     // ========== RS101: ROCKET PROPULSION ==========
//     {
//         title: "Clarification on specific impulse calculation",
//         content: `Hello everyone,

// I'm working on the propulsion theory problems and I'm confused about specific impulse calculation.

// The formula Isp = ve / g0 - does g0 refer to standard gravity (9.81 m/s²) or local gravity at the launch site?

// Also, for multi-stage rockets, do we calculate Isp for each stage separately or use some kind of weighted average?`,
//         course: "RS101",
//         category: "Clarification",
//         author: {
//             _id: "234",
//             name: "Bruce Wayne",
//             role: "student"
//         },
//         tags: ["hw1"],
//         isPinned: false,
//         isInstructor: false,
//         views: 78,
//         likes: 3,
//         likedBy: ["345", "456"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Always use standard gravity (9.81 m/s²) for specific impulse calculations regardless of launch site. For multi-stage rockets, each stage has its own Isp based on its engine characteristics - you don't average them.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 12,
//                 likedBy: ["234", "345", "456", "567"],
//                 createdAt: new Date("2025-11-28T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-25T09:00:00Z"),
//         updatedAt: new Date("2025-11-28T10:00:00Z")
//     },
//     {
//         title: "Help with thrust vector control equations",
//         content: `I'm stuck on problem 3.7 in the textbook about thrust vector control.

// Given:
// - Gimbal angle θ = 5°
// - Thrust T = 50 kN
// - Control moment arm d = 2.5 m

// I understand we need to decompose the thrust into axial and lateral components, but my calculated control moment seems way off from the answer key. Am I missing a factor or using the wrong coordinate system?`,
//         course: "RS101",
//         category: "Concept",
//         author: {
//             _id: "567",
//             name: "Bruce Banner",
//             role: "student"
//         },
//         tags: ["hw2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 134,
//         likes: 5,
//         likedBy: ["234", "345", "789"],
//         bookmarked: [],
//         starred: ["234"],
//         followups: [
//             {
//                 content: "Make sure you're using radians, not degrees! θ = 5° = 0.0873 rad. Also verify you're multiplying the lateral thrust component (T·sin(θ)) by the moment arm, not the total thrust.",
//                 author: {
//                     _id: "345",
//                     name: "Natasha Romanoff",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 8,
//                 likedBy: ["234", "567"],
//                 createdAt: new Date("2025-11-22T14:30:00Z")
//             },
//             {
//                 content: "Excellent catch on the radians! Also remember that for small angles, sin(θ) ≈ θ (in radians), which might be what the textbook used for simplification.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 15,
//                 likedBy: ["234", "345", "567", "789"],
//                 createdAt: new Date("2025-11-22T16:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-22T13:00:00Z"),
//         updatedAt: new Date("2025-11-22T16:00:00Z")
//     },
//     {
//         title: "Exam 2 Coverage Clarification",
//         content: `Hi Professor Stark,

// Can you clarify what material will be on Exam 2? Will it be cumulative or just cover chapters 5-8?

// Also, will we need to memorize the rocket equation derivation or just know how to apply it?

// Thanks!`,
//         course: "RS101",
//         category: "Other",
//         author: {
//             _id: "456",
//             name: "Thor Odinson",
//             role: "student"
//         },
//         tags: ["logistics"],
//         isPinned: true,
//         isInstructor: false,
//         views: 267,
//         likes: 22,
//         likedBy: ["234", "345", "567", "789", "890"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Exam 2 will cover chapters 5-8 (propulsion systems, nozzle theory, combustion). It's not cumulative. You should understand the rocket equation derivation conceptually but won't need to derive it from scratch on the exam.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 28,
//                 likedBy: ["234", "345", "456", "567", "789"],
//                 createdAt: new Date("2025-11-29T09:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-28T18:00:00Z"),
//         updatedAt: new Date("2025-11-29T09:00:00Z")
//     },
//     {
//         title: "Nozzle expansion ratio calculation error",
//         content: `Getting incorrect values for nozzle expansion ratio.

// My approach:
// 1. Used isentropic flow relations
// 2. Area ratio ε = Ae/At
// 3. Calculated from pressure ratio using γ = 1.4

// But my answer (ε = 12.3) doesn't match the expected value (ε = 8.7). 

// Is there a correction factor I'm missing for real gas effects?`,
//         course: "RS101",
//         category: "Bug",
//         author: {
//             _id: "anon_rocket_001",
//             name: "Anonymous Rocket",
//             role: "student"
//         },
//         tags: ["hw3"],
//         isPinned: false,
//         isInstructor: false,
//         views: 89,
//         likes: 2,
//         likedBy: ["234"],
//         bookmarked: [],
//         starred: [],
//         followups: [],
//         createdAt: new Date("2025-11-26T11:00:00Z"),
//         updatedAt: new Date("2025-11-26T11:00:00Z")
//     },

//     // ========== RS102: AERODYNAMICS ==========
//     {
//         title: "Confusion about Reynolds number effects on airfoils",
//         content: `Working on the airfoil design lab and I'm getting different lift coefficients than expected for NACA 2412.

// At α = 4°, my calculation gives CL = 0.52 but the reference table shows 0.48.

// The problem states Re = 3×10^6 but the tables are for Re = 9×10^6. How do I correct for the Reynolds number difference?`,
//         course: "RS102",
//         category: "Testing",
//         author: {
//             _id: "789",
//             name: "Aragorn Elessar",
//             role: "student"
//         },
//         tags: ["labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 112,
//         likes: 4,
//         likedBy: ["234", "345"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "You need to apply a Reynolds number correction. For lower Re, the lift coefficient typically decreases. Use the empirical formula: CL(Re1) = CL(Re2) × (Re1/Re2)^0.15 as an approximation.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 9,
//                 likedBy: ["789", "234"],
//                 createdAt: new Date("2025-11-27T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-26T15:00:00Z"),
//         updatedAt: new Date("2025-11-27T10:00:00Z")
//     },
//     {
//         title: "Boundary layer transition - laminar to turbulent",
//         content: `In lecture we discussed boundary layer transition but I'm unclear on the exact criteria.

// Is it purely Reynolds number based (Re_x > 5×10^5) or do we need to consider pressure gradient and surface roughness too?

// For our wind tunnel lab, how do we determine if our flow is laminar or turbulent?`,
//         course: "RS102",
//         category: "Concept",
//         author: {
//             _id: "890",
//             name: "Legolas Greenleaf",
//             role: "student"
//         },
//         tags: ["labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 156,
//         likes: 7,
//         likedBy: ["234", "789"],
//         bookmarked: [],
//         starred: ["890"],
//         followups: [
//             {
//                 content: "Reynolds number is the primary factor, but you're right that pressure gradient matters! Favorable pressure gradient (accelerating flow) delays transition, adverse gradient promotes it. In the lab, look for the flow visualization - laminar is smooth, turbulent is chaotic.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 11,
//                 likedBy: ["890", "234", "789"],
//                 createdAt: new Date("2025-11-20T13:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-20T11:00:00Z"),
//         updatedAt: new Date("2025-11-20T13:00:00Z")
//     },
//     {
//         title: "Wind tunnel assignment - data collection tips?",
//         content: `For the upcoming wind tunnel lab, any tips on getting clean data?

// Last week's lab my pressure readings were super noisy and I had to throw out half my data points.

// Should I:
// 1. Take more samples and average?
// 2. Use a different pressure transducer?
// 3. Check for leaks in the tubing?

// What worked for others?`,
//         course: "RS102",
//         category: "Other",
//         author: {
//             _id: "567",
//             name: "Bruce Banner",
//             role: "student"
//         },
//         tags: ["labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 98,
//         likes: 6,
//         likedBy: ["234", "789", "890"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Definitely check for leaks first - that's usually the culprit! Also make sure your manometer is level and give it time to stabilize before recording (at least 30 seconds).",
//                 author: {
//                     _id: "234",
//                     name: "Bruce Wayne",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 5,
//                 likedBy: ["567", "789"],
//                 createdAt: new Date("2025-11-24T14:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-24T12:00:00Z"),
//         updatedAt: new Date("2025-11-24T14:00:00Z")
//     },

//     // ========== RS103: SPACECRAFT DESIGN ==========
//     {
//         title: "Thermal control system - radiator sizing",
//         content: `For the spacecraft thermal design project, I'm working on radiator sizing.

// Orbit: LEO, 400 km altitude, β = 23°
// Power dissipation: 500 W
// Required temperature: 20°C ± 5°C

// I calculated radiator area = 1.2 m² but this seems too large for a CubeSat. Am I using the wrong emissivity or view factors?

// Stefan-Boltzmann equation: Q = εσAT⁴`,
//         course: "RS103",
//         category: "Concept",
//         author: {
//             _id: "345",
//             name: "Natasha Romanoff",
//             role: "student"
//         },
//         tags: ["hw4"],
//         isPinned: false,
//         isInstructor: false,
//         views: 87,
//         likes: 3,
//         likedBy: ["234", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Don't forget the view factor to space (F ≈ 0.7 for typical spacecraft geometry) and that you're radiating from both sides if using OSRs. Also, 500W is a lot for a CubeSat - verify your power budget!",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 8,
//                 likedBy: ["345", "234"],
//                 createdAt: new Date("2025-11-21T15:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-21T13:00:00Z"),
//         updatedAt: new Date("2025-11-21T15:00:00Z")
//     },
//     {
//         title: "Attitude determination using sun sensors",
//         content: `Question about the ADCS assignment:

// We're using two sun sensors to determine spacecraft attitude. I have the sun vector in body frame from both sensors, but when I try to solve for the rotation matrix, I get singular matrix errors.

// Am I missing a constraint or do I need a third sensor for full 3-axis determination?`,
//         course: "RS103",
//         category: "Bug",
//         author: {
//             _id: "anon_space_001",
//             name: "Anonymous Satellite",
//             role: "student"
//         },
//         tags: ["hw5"],
//         isPinned: false,
//         isInstructor: false,
//         views: 145,
//         likes: 6,
//         likedBy: ["234", "345", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [],
//         createdAt: new Date("2025-11-19T10:00:00Z"),
//         updatedAt: new Date("2025-11-19T10:00:00Z")
//     },
//     {
//         title: "Project Milestone 2 - Subsystem Selection Due Friday",
//         content: `Reminder: Project Milestone 2 (subsystem selection and preliminary mass budget) is due this Friday at 11:59 PM.

// Requirements:
// ✓ Propulsion system selection with justification
// ✓ Power system architecture (solar array + battery sizing)
// ✓ ADCS approach (3-axis stabilized or spin-stabilized)
// ✓ Preliminary mass budget (< 10kg total for CubeSat class)

// Submit via Canvas. Teams that need help with trade studies, come to office hours Wednesday 2-5 PM.`,
//         course: "RS103",
//         category: "Other",
//         author: {
//             _id: "123",
//             name: "Tony Stark",
//             role: "instructor"
//         },
//         tags: ["logistics"],
//         isPinned: true,
//         isInstructor: true,
//         views: 312,
//         likes: 18,
//         likedBy: ["234", "345", "456", "567", "789", "890"],
//         bookmarked: [],
//         starred: [],
//         followups: [],
//         createdAt: new Date("2025-12-01T08:00:00Z"),
//         updatedAt: new Date("2025-12-01T08:00:00Z")
//     },

//     // ========== RS104: ORGANIC CHEMISTRY ==========
//     {
//         title: "SN1 vs SN2 reaction mechanism - how to predict?",
//         content: `I'm struggling to predict whether a substitution reaction will go through SN1 or SN2 mechanism.

// For example: (CH3)3CBr + OH⁻ in ethanol

// The substrate is tertiary (favors SN1) but OH⁻ is a strong nucleophile (favors SN2). Which factor wins?

// Is there a systematic way to predict the mechanism or do I just need to memorize cases?`,
//         course: "RS104",
//         category: "Concept",
//         author: {
//             _id: "456",
//             name: "Thor Odinson",
//             role: "student"
//         },
//         tags: ["hw2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 198,
//         likes: 12,
//         likedBy: ["234", "345", "567", "890"],
//         bookmarked: [],
//         starred: ["456"],
//         followups: [
//             {
//                 content: "Great question! For tertiary substrates, SN1 always wins because SN2 is sterically impossible (backside attack blocked). The order: 1° substrates → SN2, 3° → SN1, 2° → depends on conditions (polar protic solvent and weak nucleophile → SN1, polar aprotic and strong nucleophile → SN2).",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 20,
//                 likedBy: ["456", "234", "345", "567"],
//                 createdAt: new Date("2025-11-18T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-17T14:00:00Z"),
//         updatedAt: new Date("2025-11-18T10:00:00Z")
//     },
//     {
//         title: "NMR spectrum interpretation - unexpected splitting pattern",
//         content: `Need help with NMR problem from last week's lab.

// I synthesized what should be ethyl acetate (CH3COOCH2CH3) but my ¹H-NMR shows:
// - δ 1.2 ppm (triplet, 3H) ✓
// - δ 2.0 ppm (singlet, 3H) ✓  
// - δ 4.1 ppm (quartet, 2H) ✓
// - δ 3.7 ppm (singlet, 1H) ← UNEXPECTED

// What's that extra singlet? Did I make a different product or is there an impurity?`,
//         course: "RS104",
//         category: "Testing",
//         author: {
//             _id: "890",
//             name: "Legolas Greenleaf",
//             role: "student"
//         },
//         tags: ["labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 134,
//         likes: 8,
//         likedBy: ["234", "456", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "That singlet at 3.7 ppm is likely unreacted methanol or acetic acid from your synthesis. Run TLC to check purity. If it's a significant peak, you might need to re-purify using column chromatography.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 12,
//                 likedBy: ["890", "234", "789"],
//                 createdAt: new Date("2025-11-23T11:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-23T09:00:00Z"),
//         updatedAt: new Date("2025-11-23T11:00:00Z")
//     },
//     {
//         title: "Lab safety - disposing of chromic acid waste",
//         content: `Quick question about lab cleanup today:

// We used chromic acid (H2CrO4) for oxidation reactions. The waste container is labeled "heavy metal waste" but I wasn't sure if spent chromic acid goes there or in the "aqueous acid waste" container.

// Want to make sure I'm disposing of it correctly for environmental safety.`,
//         course: "RS104",
//         category: "Setup",
//         author: {
//             _id: "234",
//             name: "Bruce Wayne",
//             role: "student"
//         },
//         tags: ["labs"],
//         isPinned: false,
//         isInstructor: false,
//         views: 67,
//         likes: 2,
//         likedBy: ["890"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Chromic acid definitely goes in the heavy metal waste container because of the chromium(VI). Never mix it with regular acid waste. Good question - safety first!",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 5,
//                 likedBy: ["234", "890"],
//                 createdAt: new Date("2025-11-25T13:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-25T12:00:00Z"),
//         updatedAt: new Date("2025-11-25T13:00:00Z")
//     },

//     // ========== RS105: INORGANIC CHEMISTRY ==========
//     {
//         title: "Crystal field splitting - why is [Co(NH3)6]³⁺ yellow?",
//         content: `Struggling with crystal field theory concepts.

// [Co(NH3)6]³⁺ is yellow (absorbs violet/blue light, ~430 nm)
// [Co(H2O)6]³⁺ is blue-green (absorbs orange/red light, ~600 nm)

// NH3 is a stronger field ligand than H2O, so Δo should be LARGER for the ammine complex. Larger Δo = higher energy transition = shorter wavelength absorbed.

// But yellow transmission suggests LONGER wavelength absorption? I'm confused about the relationship between color and crystal field splitting.`,
//         course: "RS105",
//         category: "Concept",
//         author: {
//             _id: "567",
//             name: "Bruce Banner",
//             role: "student"
//         },
//         tags: ["hw3"],
//         isPinned: false,
//         isInstructor: false,
//         views: 201,
//         likes: 11,
//         likedBy: ["234", "345", "456", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "You're mixing up absorption and transmission! Yellow solution ABSORBS blue/violet (~430 nm, higher energy) and TRANSMITS yellow. Larger Δo = higher energy d-d transition = SHORTER wavelength absorbed = complementary color (yellow) transmitted. Water complex has smaller Δo, absorbs lower energy (orange), transmits blue-green.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 18,
//                 likedBy: ["567", "234", "345", "456"],
//                 createdAt: new Date("2025-11-16T14:00:00Z")
//             },
//             {
//                 content: "Think about a color wheel - the color you SEE is opposite to the color ABSORBED. This is the key to understanding transition metal complexes!",
//                 author: {
//                     _id: "789",
//                     name: "Aragorn Elessar",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 7,
//                 likedBy: ["567", "234"],
//                 createdAt: new Date("2025-11-16T15:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-16T12:00:00Z"),
//         updatedAt: new Date("2025-11-16T15:00:00Z")
//     },
//     {
//         title: "Ligand field stabilization energy calculation",
//         content: `Problem set 4, question 7:

// Calculate LFSE for [Fe(CN)6]⁴⁻ in octahedral field.

// Fe²⁺ is d⁶. CN⁻ is strong field, so low-spin configuration: t2g⁶ eg⁰

// LFSE = (6 × -0.4Δo) + (0 × 0.6Δo) + P
//      = -2.4Δo + P

// But the answer key shows -2.4Δo - 2P. Where does the -2P come from? I thought pairing energy P is positive (energy cost)?`,
//         course: "RS105",
//         category: "Clarification",
//         author: {
//             _id: "anon_inorg_001",
//             name: "Anonymous Complex",
//             role: "student"
//         },
//         tags: ["hw4"],
//         isPinned: false,
//         isInstructor: false,
//         views: 167,
//         likes: 9,
//         likedBy: ["234", "567", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [],
//         createdAt: new Date("2025-11-15T16:00:00Z"),
//         updatedAt: new Date("2025-11-15T16:00:00Z")
//     },

//     // ========== RS106: PHYSICAL CHEMISTRY ==========
//     {
//         title: "Partition function for diatomic molecule - reduced mass?",
//         content: `Problem set 3, question 2b - calculating molecular partition function.

// For translational partition function:
// qtrans = (2πmkT/h²)^(3/2) × V

// Question: Do I use reduced mass μ = m1m2/(m1+m2) or just the molecular mass M = m1 + m2?

// The textbook isn't clear and I'm getting different answers depending on which mass I use.`,
//         course: "RS106",
//         category: "Clarification",
//         author: {
//             _id: "789",
//             name: "Aragorn Elessar",
//             role: "student"
//         },
//         tags: ["hw2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 123,
//         likes: 5,
//         likedBy: ["234", "567"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "For qtrans of the CENTER OF MASS motion, use the total molecular mass M. Reduced mass μ is only for INTERNAL motions (vibration, rotation). Common mistake!",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 10,
//                 likedBy: ["789", "234", "567"],
//                 createdAt: new Date("2025-11-12T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-12T08:00:00Z"),
//         updatedAt: new Date("2025-11-12T10:00:00Z")
//     },
//     {
//         title: "Thermodynamics problem - reversible vs irreversible work",
//         content: `Carnot cycle problem is driving me crazy!

// Given:
// - Hot reservoir: TH = 600 K
// - Cold reservoir: TC = 300 K
// - Heat absorbed: QH = 1000 J

// I calculated work output W = 500 J using efficiency η = 1 - TC/TH = 0.5

// But the solution manual shows W = 450 J. What am I missing? Is there an irreversibility I should account for?`,
//         course: "RS106",
//         category: "Bug",
//         author: {
//             _id: "890",
//             name: "Legolas Greenleaf",
//             role: "student"
//         },
//         tags: ["hw3"],
//         isPinned: false,
//         isInstructor: false,
//         views: 178,
//         likes: 8,
//         likedBy: ["234", "789", "567"],
//         bookmarked: [],
//         starred: ["890"],
//         followups: [
//             {
//                 content: "Check if the problem states it's a REAL Carnot cycle or an IDEAL one. Real engines have friction losses, heat leaks, etc. But if it says 'reversible Carnot cycle' your answer of 500 J is correct. Might be an error in the solutions manual - bring it up in class!",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 12,
//                 likedBy: ["890", "234", "789"],
//                 createdAt: new Date("2025-11-14T11:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-14T09:00:00Z"),
//         updatedAt: new Date("2025-11-14T11:00:00Z")
//     },

//     // ========== RS107: ANCIENT LANGUAGES OF MIDDLE-EARTH ==========
//     {
//         title: "Tengwar transcription - vowel placement rules",
//         content: `For the Tengwar writing assignment, I'm confused about tehtar (vowel diacritic) placement.

// In the word "Elbereth":
// - Do the tehtar go ABOVE the consonant that follows the vowel?
// - Or ABOVE the consonant that precedes it?

// Example: Is it E-l-be-re-th or El-be-reth for tehtar grouping?

// The handout shows both styles and I'm not sure which mode we're supposed to use.`,
//         course: "RS107",
//         category: "Clarification",
//         author: {
//             _id: "234",
//             name: "Bruce Wayne",
//             role: "student"
//         },
//         tags: ["hw1"],
//         isPinned: false,
//         isInstructor: false,
//         views: 156,
//         likes: 7,
//         likedBy: ["789", "890"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "For Classical Quenya mode (which we're using), tehtar go ABOVE the consonant that FOLLOWS the vowel. So 'Elbereth' would have: [E-tengwa] [l with e-tehta] [b with e-tehta] [r with e-tehta] [th]. For final vowels with no following consonant, use carrier úre.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 14,
//                 likedBy: ["234", "789", "890"],
//                 createdAt: new Date("2025-11-27T13:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-27T11:00:00Z"),
//         updatedAt: new Date("2025-11-27T13:00:00Z")
//     },
//     {
//         title: "Sindarin vs Quenya - when to use which?",
//         content: `I know Sindarin is the "common" Elvish and Quenya is the "high" Elvish, but in practical terms, when would each be used in Middle-earth?

// For our translation project, we're translating Aragorn's coronation oath. Should I use:
// a) Sindarin (as the common tongue of Gondor)
// b) Quenya (as the ceremonial/formal language)

// Both seem appropriate but would give very different translations!`,
//         course: "RS107",
//         category: "Concept",
//         author: {
//             _id: "789",
//             name: "Aragorn Elessar",
//             role: "student"
//         },
//         tags: ["hw2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 223,
//         likes: 15,
//         likedBy: ["234", "345", "890"],
//         bookmarked: [],
//         starred: ["789"],
//         followups: [
//             {
//                 content: "Excellent question! For a coronation in Gondor, Quenya would absolutely be used - it's the language of ceremony, lore, and high matters. Think of it like Latin in medieval Europe. Sindarin is for daily use. Aragorn, being Dúnedain, would definitely use Quenya for his oath.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 22,
//                 likedBy: ["789", "234", "345", "890"],
//                 createdAt: new Date("2025-11-19T14:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-19T12:00:00Z"),
//         updatedAt: new Date("2025-11-19T14:00:00Z")
//     },

//     // ========== RS108: INTER-SPECIES DIPLOMACY ==========
//     {
//         title: "Council of Elrond analysis - diplomatic strategies",
//         content: `For Thursday's discussion on the Council of Elrond (Fellowship of the Ring, Book II, Chapter 2):

// I'm analyzing Gandalf's diplomatic approach. He:
// 1. Let others speak first (Elrond, Boromir, Legolas)
// 2. Revealed information gradually
// 3. Didn't immediately propose the Ring's destruction

// Was this strategic patience or did he genuinely not know the solution initially?

// Also, why did Elrond ultimately choose Frodo over Boromir when Boromir was clearly the better warrior?`,
//         course: "RS108",
//         category: "Concept",
//         author: {
//             _id: "456",
//             name: "Thor Odinson",
//             role: "student"
//         },
//         tags: ["hw1"],
//         isPinned: false,
//         isInstructor: false,
//         views: 289,
//         likes: 24,
//         likedBy: ["234", "789", "890", "567"],
//         bookmarked: [],
//         starred: ["456"],
//         followups: [
//             {
//                 content: "Gandalf's strategy was brilliant - he knew that for such a monumental decision, the Council needed to arrive at the conclusion themselves rather than being told. This is classic consensus-building diplomacy. As for Frodo: Elrond recognized that the Ring's corruption would be greatest on those who sought power. Frodo's humility and lack of ambition made him ideal. Sometimes the weakest person is the strongest choice.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 35,
//                 likedBy: ["456", "234", "789", "890", "567", "345"],
//                 createdAt: new Date("2025-11-30T10:00:00Z")
//             },
//             {
//                 content: "I'd add that Gandalf also had to navigate the historical tensions between Dwarves and Elves (Gimli vs Legolas) and between Gondor and Rohan. He couldn't appear to favor any faction.",
//                 author: {
//                     _id: "789",
//                     name: "Aragorn Elessar",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 18,
//                 likedBy: ["456", "234", "890"],
//                 createdAt: new Date("2025-11-30T14:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-30T08:00:00Z"),
//         updatedAt: new Date("2025-11-30T14:00:00Z")
//     },
//     {
//         title: "Dwarf-Elf relations - economic interdependence",
//         content: `Essay topic: "Analyze how economic trade between Dwarves and Elves influenced their diplomatic relations"

// I'm arguing that despite cultural tensions, trade in mithril (Dwarves) and lembas/weapons (Elves) created mutual dependence that prevented open warfare.

// But I can't find primary source evidence of actual trade agreements. Are there any texts that document this, or is this mostly inference from archeological findings?

// Need at least 3 primary sources for the essay. Help!`,
//         course: "RS108",
//         category: "Other",
//         author: {
//             _id: "890",
//             name: "Legolas Greenleaf",
//             role: "student"
//         },
//         tags: ["hw2"],
//         isPinned: false,
//         isInstructor: false,
//         views: 134,
//         likes: 6,
//         likedBy: ["789", "456"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Check Appendix A (Annals of the Kings and Rulers) and Unfinished Tales Part 2. While explicit trade agreements aren't documented, you can infer from: 1) Dwarven gates to Moria made by Elves (Celebrimbor), 2) Elven-made weapons given to Dwarves, 3) Gandalf's mentions of past cooperation. For a stronger argument, focus on specific examples rather than broad claims.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 9,
//                 likedBy: ["890", "789", "456"],
//                 createdAt: new Date("2025-11-13T11:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-13T09:00:00Z"),
//         updatedAt: new Date("2025-11-13T11:00:00Z")
//     },
//     {
//         title: "Midterm Review Session - This Thursday!",
//         content: `Midterm review session scheduled:

// 📅 Thursday, December 5th
// 🕐 6:00 PM - 8:30 PM  
// 📍 Snell Library, Room 110

// Topics covered:
// ✓ Historical alliances (Elves-Men, Dwarves-Elves)
// ✓ The White Council and collective decision-making
// ✓ Diplomacy during the War of the Ring
// ✓ Treaty negotiations (Rohan-Gondor mutual defense pact)
// ✓ Conflict resolution strategies

// Pizza and elvish bread will be provided! 🍕

// Bring your questions and we'll go through sample essay prompts together.`,
//         course: "RS108",
//         category: "Other",
//         author: {
//             _id: "678",
//             name: "Frodo Baggins",
//             role: "instructor"
//         },
//         tags: ["logistics"],
//         isPinned: true,
//         isInstructor: true,
//         views: 398,
//         likes: 47,
//         likedBy: ["234", "345", "456", "567", "789", "890"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Will this be recorded for students who can't attend? I have another exam that evening.",
//                 author: {
//                     _id: "456",
//                     name: "Thor Odinson",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 8,
//                 likedBy: ["234", "890"],
//                 createdAt: new Date("2025-12-02T15:00:00Z")
//             },
//             {
//                 content: "Yes! We'll record it and post the link here by Friday morning.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 12,
//                 likedBy: ["456", "234", "890"],
//                 createdAt: new Date("2025-12-02T16:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-12-02T09:00:00Z"),
//         updatedAt: new Date("2025-12-02T16:00:00Z")
//     },

//     // ========== ADDITIONAL DIVERSE POSTS ==========
//     {
//         title: "Lab partner needed for final project!",
//         content: `Looking for a lab partner for the final spacecraft design project.

// My strengths: thermal analysis, CAD modeling
// Looking for: someone good with orbital mechanics and power systems

// Prefer to meet 2-3 times per week. I'm usually on campus Mon/Wed/Fri.

// DM me if interested!`,
//         course: "RS103",
//         category: "Other",
//         author: {
//             _id: "345",
//             name: "Natasha Romanoff",
//             role: "student"
//         },
//         tags: ["logistics"],
//         isPinned: false,
//         isInstructor: false,
//         views: 89,
//         likes: 4,
//         likedBy: ["567", "789"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "I'm interested! I'm pretty good with orbital mechanics and did power system design for my summer internship. Free Mon/Wed afternoons. Let's connect!",
//                 author: {
//                     _id: "567",
//                     name: "Bruce Banner",
//                     role: "student"
//                 },
//                 isAnswer: false,
//                 likes: 2,
//                 likedBy: ["345"],
//                 createdAt: new Date("2025-11-17T12:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-17T10:00:00Z"),
//         updatedAt: new Date("2025-11-17T12:00:00Z")
//     },
//     {
//         title: "Recommended textbooks for further reading?",
//         content: `I'm really enjoying this course and want to dive deeper into aerodynamic theory.

// Beyond our required textbook (Anderson), what are some good resources for:
// 1. Compressible flow
// 2. Computational fluid dynamics
// 3. Experimental techniques

// Preferably something accessible (not pure math theory) with good examples and problem sets.`,
//         course: "RS102",
//         category: "Other",
//         author: {
//             _id: "234",
//             name: "Bruce Wayne",
//             role: "student"
//         },
//         tags: ["logistics"],
//         isPinned: false,
//         isInstructor: false,
//         views: 167,
//         likes: 11,
//         likedBy: ["789", "890", "567"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "Great recommendations: 1) 'Modern Compressible Flow' by Anderson (same author, more advanced), 2) 'Computational Fluid Dynamics' by Hoffmann & Chiang (very practical), 3) For experimental: 'Wind Tunnel Testing' by Pope & Harper. All are in the library reserve.",
//                 author: {
//                     _id: "123",
//                     name: "Tony Stark",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 16,
//                 likedBy: ["234", "789", "890"],
//                 createdAt: new Date("2025-11-10T10:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-10T09:00:00Z"),
//         updatedAt: new Date("2025-11-10T10:00:00Z")
//     },
//     {
//         title: "Regrade request - Homework 3 grading error?",
//         content: `I believe there's a grading error on my HW3 submission.

// I lost 15 points for "incorrect mechanism" on problem 2 (E2 elimination), but I showed:
// - Anti-periplanar geometry ✓
// - Correct base abstraction ✓
// - Proper alkene formation ✓

// My mechanism matches the textbook solution exactly. Could the grader review this?

// I've already submitted a formal regrade request on Canvas but wanted to check if anyone else had this issue.`,
//         course: "RS104",
//         category: "Other",
//         author: {
//             _id: "anon_chem_002",
//             name: "Anonymous Molecule",
//             role: "student"
//         },
//         tags: ["hw3", "logistics"],
//         isPinned: false,
//         isInstructor: false,
//         views: 92,
//         likes: 3,
//         likedBy: ["234"],
//         bookmarked: [],
//         starred: [],
//         followups: [
//             {
//                 content: "I'll review the regrade requests this weekend. If your mechanism is correct as you described, you'll get the points back. Sometimes the rubric has specific formatting requirements (arrow notation, stereochemistry labels) that aren't obvious - make sure those are all there.",
//                 author: {
//                     _id: "678",
//                     name: "Frodo Baggins",
//                     role: "instructor"
//                 },
//                 isAnswer: true,
//                 likes: 5,
//                 likedBy: ["234", "789"],
//                 createdAt: new Date("2025-11-08T14:00:00Z")
//             }
//         ],
//         createdAt: new Date("2025-11-08T11:00:00Z"),
//         updatedAt: new Date("2025-11-08T14:00:00Z")
//     }
// ];

// async function seedPosts() {
//     try {
//         console.log("Connecting to MongoDB...");
//         console.log("Connection string:", CONNECTION_STRING);
        
//         await mongoose.connection.asPromise();
//         console.log("✓ Connected to MongoDB");
        
//         console.log("\nClearing existing pazza_posts...");
//         const deleteResult = await model.deleteMany({});
//         console.log(`✓ Deleted ${deleteResult.deletedCount} existing posts`);

//         console.log("\nInserting sample posts...");
//         const result = await model.insertMany(samplePosts);
//         console.log(`✓ Successfully inserted ${result.length} posts!`);
        
//         console.log("\n📊 Posts by course:");
//         const courseGroups = {};
//         result.forEach(post => {
//             courseGroups[post.course] = (courseGroups[post.course] || 0) + 1;
//         });
//         Object.entries(courseGroups).forEach(([course, count]) => {
//             console.log(`   ${course}: ${count} posts`);
//         });
        
//         console.log("\n📝 Sample posts created:");
//         result.slice(0, 5).forEach(post => {
//             console.log(`   - ${post.title} (${post.course}, ${post.category})`);
//         });
//         console.log(`   ... and ${result.length - 5} more`);

//         await mongoose.connection.close();
//         console.log("\n✓ Database connection closed. Seed complete! 🎉\n");
//     } catch (error) {
//         console.error("❌ Error seeding database:", error);
//         await mongoose.connection.close();
//     }
// }

// seedPosts();