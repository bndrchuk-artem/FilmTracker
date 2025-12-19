import { Movie, TVShow } from '../../common/entities/movie.entity';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 27205,
    title: 'Inception',
    overview:
      'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    release_date: '2010-07-15',
    vote_average: 8.4,
    genre_ids: [28, 878, 53],
    media_type: 'movie',
  },
  {
    id: 550,
    title: 'Fight Club',
    overview:
      'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
    genre_ids: [18],
    media_type: 'movie',
  },
  {
    id: 13,
    title: 'Forrest Gump',
    overview:
      'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop_path: '/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
    release_date: '1994-07-06',
    vote_average: 8.5,
    genre_ids: [35, 18, 10749],
    media_type: 'movie',
  },
  {
    id: 278,
    title: 'The Shawshank Redemption',
    overview:
      'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    release_date: '1994-09-23',
    vote_average: 8.7,
    genre_ids: [18, 80],
    media_type: 'movie',
  },
  {
    id: 238,
    title: 'The Godfather',
    overview:
      'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    release_date: '1972-03-14',
    vote_average: 8.7,
    genre_ids: [18, 80],
    media_type: 'movie',
  },
];

export const MOCK_TV_SHOWS: TVShow[] = [
  {
    id: 1396,
    name: 'Breaking Bad',
    overview:
      "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    first_air_date: '2008-01-20',
    vote_average: 8.9,
    genre_ids: [18, 80],
    media_type: 'tv',
  },
  {
    id: 1399,
    name: 'Game of Thrones',
    overview:
      "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdrop_path: '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    first_air_date: '2011-04-17',
    vote_average: 8.4,
    genre_ids: [10765, 18, 10759],
    media_type: 'tv',
  },
  {
    id: 60735,
    name: 'The Flash',
    overview:
      'After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only "meta-human" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won\'t be long before the world learns what Barry Allen has become...The Flash.',
    poster_path: '/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
    backdrop_path: '/9Jmd1OumCjaXDkpllbSGi2EpJvl.jpg',
    first_air_date: '2014-10-07',
    vote_average: 7.8,
    genre_ids: [18, 10765],
    media_type: 'tv',
  },
  {
    id: 94605,
    name: 'Arcane',
    overview:
      'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.',
    poster_path: '/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    backdrop_path: '/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg',
    first_air_date: '2021-11-06',
    vote_average: 8.7,
    genre_ids: [16, 10765, 10759, 18],
    media_type: 'tv',
  },
  {
    id: 82856,
    name: 'The Mandalorian',
    overview:
      'After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.',
    poster_path: '/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg',
    backdrop_path: '/9ijMGlJKqcslswWUzTEwScm82Gs.jpg',
    first_air_date: '2019-11-12',
    vote_average: 8.5,
    genre_ids: [10765, 10759, 37],
    media_type: 'tv',
  },
];
