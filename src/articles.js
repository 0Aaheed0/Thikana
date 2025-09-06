const articles = [
    {
      id: 1,
      title: "Missing Teenager: Adam Warlock, Age: 16",
      shortDescription: "Adam Warlock is missing since yesterday.",
      description: `Adam warlock, a 16-year-old, was last seen on September 1st, 2025, 
      near the downtown library. He is 5'10" tall and has brown hair.`,
      image: "https://media.istockphoto.com/id/924727534/photo/man-sitting-holding-head-in-hands-stressed-sad-young-male-having-mental-problems-feeling-bad.webp?a=1&b=1&s=612x612&w=0&k=20&c=BkWHo9Q_J2CV-7LV3n2j_QJoBn5NHn8v-awjJ1t1clU=",
      caseType: "missing"
    },
    {
      id: 2,
      title: "Major Pile-Up on Kochukhet",
      shortDescription: "A multi-vehicle collision has occurred.",
      description: `A multi-vehicle collision has occurred on Kochukhet near exit highway. 
      All lanes are currently blocked, and major delays are expected.`,
      image: "https://images.unsplash.com/photo-1688164548686-f9a02265059e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlaGljbGUlMjBhY2NpZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      caseType: "road-accident"
    },
    {
      id: 3,
      title: "Elderly Woman, Sheikh Hasina, 82, Missing",
      shortDescription: "Sheikh Hasina is a missing elderly woman.",
      description: `Sheikh Hasina, an 82-year-old woman with dementia, has been missing from her home since 10:00 AM on September 4th, 2025. 
      She was last seen in the Dhanmondi neighborhood.`,
      image: "https://media.istockphoto.com/id/2167218240/photo/young-asian-woman-teaching-her-retired-mother-to-use-new-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=jrq1BL2h5eC_M13ql2yeMOe88Jb_wNwFurUo8yZDZ70=",
      caseType: "missing"
    },
    {
      id: 4,
      title: "Motorcycle Accident on Main and 4th",
      shortDescription: "A motorcycle accident has occurred on Main and 4th.",
      description: `A serious accident involving a motorcycle and a sedan occurred at the intersection of Main Street and Dhaka-Rajshahi Highway. 
      The intersection is partially blocked.`,
      image: "https://media.istockphoto.com/id/97476590/photo/motorcycle-crash.webp?a=1&b=1&s=612x612&w=0&k=20&c=c94k9gLK1Ssyu0M3YFHTlnRJ39XgFZNmgKbTGqySQAo=",
      caseType: "road-accident"
    },
    {
      id: 5,
      title: "Hiker Missing in Green Valley National Park",
      shortDescription: "A hiker has gone missing in Green Valley National Park.",
      description: `A 28-year-old hiker, Obaidul Kader, has been missing since September 3rd, 2025, in Green Valley National Park. 
      He was last seen near the Eagle Peak trail.`,
      image: "https://media.istockphoto.com/id/1306456269/photo/hiker-on-the-walk-in-the-spooky-forest.webp?a=1&b=1&s=612x612&w=0&k=20&c=OkZ37af2yTB80uz_58qzvM_ky7rWyQcY-W1ieAqgvNY=",
      caseType: "missing"
    },
    {
      id: 6,
      title: "Hit-and-Run on Tejgaon Industrial Area",
      shortDescription: "A cyclist was injured in a hit-and-run.",
      description: `A cyclist was struck by a vehicle in a hit-and-run incident on Tejgaon Industrial Area. 
      The vehicle is described as a dark-colored sedan.`,
      image: "https://media.istockphoto.com/id/1292290313/photo/traffic-accident-between-bicycle-and-a-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=LKbX6ucOtM1dopXzU1VU1aWuUkZyUFdyZG5Fx2p1k-U=",
      caseType: "road-accident"
    },
    {
      id: 7,
      title: "Amber Alert: 5-Year-Old Sumaiya Tasfia+ Missing",
      shortDescription: "An Amber Alert has been issued for a 5-year-old girl.",
      description: `An Amber Alert has been issued for Sumaiya Tasfia, a 5-year-old girl abducted from her home. 
      The suspect is believed to be driving a blue sedan.`,
      image: "https://media.istockphoto.com/id/540599746/photo/runaway-or-lost-girl-holding-old-ragged-teddy-bear.webp?a=1&b=1&s=612x612&w=0&k=20&c=HCZiEm7MCYoGKtppyw6IUe1tnzGs4VGXZDpg3eZjfK4=",
      caseType: "missing"
    },
    {
      id: 8,
      title: "Jackknifed Truck on Highway 101",
      shortDescription: "A jackknifed truck is blocking Highway 101.",
      description: `A jackknifed semi-truck is blocking all southbound lanes of Highway 101. 
      The road is expected to be closed for several hours.`,
      image: "https://images.unsplash.com/photo-1591419478162-a4dd21b7ec0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJ1Y2t8ZW58MHx8MHx8fDA%3D",
      caseType: "road-accident"
    },
    {
      id: 9,
      title: "Fire at Oakwood Apartments",
      shortDescription: "A fire broke out at Oakwood Apartments, several units affected.",
      description: `A fire started on the third floor of Oakwood Apartments. Firefighters responded quickly and contained the blaze. No injuries reported.`,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60",
      caseType: "complaint"
    },
    {
      id: 10,
      title: "Water Supply Request for 22 BakerStreet",
      shortDescription: "Residents of Baker Street have requested water supply restoration.",
      description: `Due to ongoing maintenance, water supply was interrupted. Residents have submitted a request for urgent restoration.`,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&auto=format&fit=crop&q=60",
      caseType: "request"
    },
    {
      id: 11,
      title: "Application for Community Park Renovation",
      shortDescription: "An application has been submitted to renovate the community park.",
      description: `Local residents have submitted an application to renovate the community park, including new playground equipment and landscaping.`,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60",
      caseType: "application"
    },
    {
      id: 12,
      title: "Resolved: Street Light Issue on Pine Avenue",
      shortDescription: "Street lights on Pine Avenue have been repaired and are now operational.",
      description: `The complaint regarding non-functional street lights on Pine Avenue has been resolved. All lights are now working.`,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&auto=format&fit=crop&q=60",
      caseType: "complaint"
    }
  ];
  
  export default articles;