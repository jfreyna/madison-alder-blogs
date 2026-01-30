// Sample blog posts for component development and testing

export interface Post {
  id: string;
  alderId: number;
  alderName: string;
  alderPhoto: string;
  district: number;
  title: string;
  url: string;
  date: string; // ISO 8601
  excerpt: string;
  categories: string[];
  scrapedAt: string;
}

export const samplePosts: Post[] = [
  {
    id: "post-1",
    alderId: 2,
    alderName: "Yannette Figueroa Cole",
    alderPhoto: "https://www.cityofmadison.com/council/images/district2.jpg",
    district: 2,
    title: "Community Meeting Recap: Winter 2026",
    url: "https://www.cityofmadison.com/council/district2/blog/community-meeting-recap-winter-2026",
    date: "2026-01-15T10:00:00Z",
    excerpt: "Thank you to everyone who attended our January community meeting. We discussed upcoming road construction projects, new zoning proposals, and the community center renovation. Your input is invaluable as we shape the future of District 2.",
    categories: ["Community", "Meetings"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-2",
    alderId: 5,
    alderName: "Juliana R. Bennett",
    alderPhoto: "https://www.cityofmadison.com/council/images/district5.jpg",
    district: 5,
    title: "Snow Removal Update for Bike Paths",
    url: "https://www.cityofmadison.com/council/district5/blog/snow-removal-update-bike-paths",
    date: "2026-01-20T14:30:00Z",
    excerpt: "Following resident feedback, I've been working with the Department of Public Works to improve snow removal timelines for bike paths in our district. Here's what you can expect this winter season.",
    categories: ["Transportation", "Public Works"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-3",
    alderId: 8,
    alderName: "MGR Govindarajan",
    alderPhoto: "https://www.cityofmadison.com/council/images/district8.jpg",
    district: 8,
    title: "Affordable Housing Initiative: Next Steps",
    url: "https://www.cityofmadison.com/council/district8/blog/affordable-housing-initiative-next-steps",
    date: "2026-01-18T09:15:00Z",
    excerpt: "At Tuesday's Common Council meeting, we approved a new affordable housing development on the east side. This 45-unit project will provide much-needed housing options for families earning 60% of area median income.",
    categories: ["Housing", "Development"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-4",
    alderId: 13,
    alderName: "Tag Evers",
    alderPhoto: "https://www.cityofmadison.com/council/images/district13.jpg",
    district: 13,
    title: "Parks & Green Spaces: 2026 Vision",
    url: "https://www.cityofmadison.com/council/district13/blog/parks-green-spaces-2026-vision",
    date: "2026-01-22T11:00:00Z",
    excerpt: "Our district is fortunate to have beautiful parks and green spaces. This year, we're focusing on improving accessibility, adding native plantings, and creating more community gathering areas. Read more about our plans.",
    categories: ["Parks", "Environment"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-5",
    alderId: 6,
    alderName: "Charles Myadze",
    alderPhoto: "https://www.cityofmadison.com/council/images/district6.jpg",
    district: 6,
    title: "Small Business Support Resources",
    url: "https://www.cityofmadison.com/council/district6/blog/small-business-support-resources",
    date: "2026-01-25T16:45:00Z",
    excerpt: "District 6 has a vibrant small business community. I've compiled a list of city and county resources available to help local entrepreneurs grow and thrive. Check out grant opportunities, free consulting, and networking events.",
    categories: ["Economic Development", "Business"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-6",
    alderId: 11,
    alderName: "Jael Currie",
    alderPhoto: "https://www.cityofmadison.com/council/images/district11.jpg",
    district: 11,
    title: "Traffic Safety Improvements on McKee Road",
    url: "https://www.cityofmadison.com/council/district11/blog/traffic-safety-improvements-mckee-road",
    date: "2026-01-12T08:30:00Z",
    excerpt: "After months of advocacy, we've secured funding for traffic calming measures on McKee Road. New crosswalks, speed bumps, and signage will improve safety for pedestrians and cyclists in the area.",
    categories: ["Transportation", "Safety"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-7",
    alderId: 19,
    alderName: "Derek Stadelman",
    alderPhoto: "https://www.cityofmadison.com/council/images/district19.jpg",
    district: 19,
    title: "Library Hours Expansion Proposal",
    url: "https://www.cityofmadison.com/council/district19/blog/library-hours-expansion-proposal",
    date: "2026-01-28T13:20:00Z",
    excerpt: "Good news for library patrons! I'm proposing extended hours at our district library branch, including Sunday openings. Libraries are vital community resources, and we need to make them accessible to working families.",
    categories: ["Libraries", "Community Services"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  {
    id: "post-8",
    alderId: 4,
    alderName: "Mike Verveer",
    alderPhoto: "https://www.cityofmadison.com/council/images/district4.jpg",
    district: 4,
    title: "Downtown Events: Spring Calendar",
    url: "https://www.cityofmadison.com/council/district4/blog/downtown-events-spring-calendar",
    date: "2026-01-10T15:00:00Z",
    excerpt: "Spring is around the corner! Mark your calendars for the Farmers Market opening day, Art Fair on the Square, and several new cultural festivals coming to downtown Madison this year.",
    categories: ["Events", "Culture"],
    scrapedAt: "2026-01-29T12:00:00Z"
  }
];
