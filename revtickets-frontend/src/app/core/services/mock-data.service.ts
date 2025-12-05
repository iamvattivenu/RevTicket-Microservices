import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event, Show } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private events: Event[] = [
    // Movies - Tamil
    {
      _id: '1',
      title: 'Vikram',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Action/Thriller',
      description: 'A retired police officer seeks revenge against a drug cartel that killed his son in this intense action thriller featuring spectacular sequences.',
      location: { city: 'Chennai', venue: 'PVR Cinemas' },
      dateTime: new Date('2024-12-25T19:30:00'),
      durationMinutes: 174,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_FMjpg_UX1000_.jpg',
      rating: 4.5,
      price: 150,
      isActive: true
    },
    {
      _id: '2',
      title: 'Beast',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Action/Comedy',
      description: 'A spy infiltrates a shopping mall taken over by terrorists in this action-comedy featuring intense sequences and humor throughout the thrilling adventure.',
      location: { city: 'Chennai', venue: 'INOX Theatre' },
      dateTime: new Date('2024-12-26T21:00:00'),
      durationMinutes: 155,
      posterUrl: 'https://stat5.bollywoodhungama.in/wp-content/uploads/2022/04/Beast-4.jpg',
      rating: 4.2,
      price: 180,
      isActive: true
    },
    {
      _id: '3',
      title: 'Ponniyin Selvan',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Historical Drama',
      description: 'Epic tale of the Chola dynasty and Prince Arulmozhi Varman featuring political intrigue, palace conspiracies, and spectacular battles in ancient Tamil civilization.',
      location: { city: 'Coimbatore', venue: 'AGS Cinemas' },
      dateTime: new Date('2024-12-27T18:00:00'),
      durationMinutes: 167,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5Mi00NGM3LWJiYWMtZDFiOWJkMGNjN2E4XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
      rating: 4.7,
      price: 200,
      isActive: true
    },
    {
      _id: '24',
      title: 'Leo',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Action Thriller',
      description: 'Vijay starrer action thriller about a man whose past catches up with him in this intense drama featuring spectacular action sequences.',
      location: { city: 'Chennai', venue: 'AGS Cinemas' },
      dateTime: new Date('2024-12-28T19:30:00'),
      durationMinutes: 164,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjY5NGIyNDMtZmYzYy00OGVmLWE4YzctYjc0YmNhNWVkMzNjXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
      rating: 4.6,
      price: 220,
      isActive: true
    },
    {
      _id: '25',
      title: 'Bison',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Sports Drama',
      description: 'Dhruv Vikram sports drama about a young athlete overcoming challenges to achieve his dreams in competitive sports.',
      location: { city: 'Chennai', venue: 'Sathyam Cinemas' },
      dateTime: new Date('2024-12-29T18:30:00'),
      durationMinutes: 142,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBkYi00ZTAyLWIxYWMtMWQwZWZiZGZlNWRlXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
      rating: 4.2,
      price: 200,
      isActive: true
    },
    {
      _id: '26',
      title: 'Idli Kadai',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Comedy Drama',
      description: 'Heartwarming family comedy about a small idli shop owner and his journey through life challenges with humor and emotion.',
      location: { city: 'Chennai', venue: 'Escape Cinemas' },
      dateTime: new Date('2024-12-30T20:00:00'),
      durationMinutes: 135,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzA3N2ZhMTMtOWUzOS00YjA0LWJkNzctYTVhYjAxZGZlMmJlXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
      rating: 4.1,
      price: 180,
      isActive: true
    },
    {
      _id: '27',
      title: 'Mudhal Nee Mudivum Nee',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Romance',
      description: 'Romantic drama about love, relationships, and life choices featuring emotional performances and beautiful storytelling.',
      location: { city: 'Chennai', venue: 'Luxe Cinemas' },
      dateTime: new Date('2024-12-31T19:30:00'),
      durationMinutes: 148,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTEyNzc5Nw@@._V1_FMjpg_UX1000_.jpg',
      rating: 4.3,
      price: 190,
      isActive: true
    },
    {
      _id: '28',
      title: 'Master',
      category: 'movies',
      language: 'Tamil',
      genreOrType: 'Action Thriller',
      description: 'Vijay and Vijay Sethupathi action thriller about a professor who takes on a juvenile home run by a gangster.',
      location: { city: 'Chennai', venue: 'Forum Vijaya Mall' },
      dateTime: new Date('2025-01-01T21:00:00'),
      durationMinutes: 179,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYjFkYjdkYTMtZDI3MS00YTM0LWFmZTItYTdhYmFjN2E2ZTdkXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
      rating: 4.5,
      price: 250,
      isActive: true
    },
    // Movies - Hindi
    {
      _id: '4',
      title: 'Pathaan',
      category: 'movies',
      language: 'Hindi',
      genreOrType: 'Action/Thriller',
      description: 'An exiled RAW agent partners with ISI agent to stop a rogue mercenary threatening global security in spectacular international action sequences.',
      location: { city: 'Mumbai', venue: 'PVR Phoenix' },
      dateTime: new Date('2024-12-25T20:00:00'),
      durationMinutes: 146,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYjY0MGVkMWEtYmQyMS00Y2QwLWI0YjctNzg5YmQ3MjA3YWEwXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
      rating: 4.3,
      price: 250,
      isActive: true
    },
    {
      _id: '5',
      title: 'Jawan',
      category: 'movies',
      language: 'Hindi',
      genreOrType: 'Action/Drama',
      description: 'A man driven by personal vendetta fights to rectify wrongs in society through high-octane action sequences and emotional social commentary throughout.',
      location: { city: 'Delhi', venue: 'INOX Nehru Place' },
      dateTime: new Date('2024-12-26T19:00:00'),
      durationMinutes: 169,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZmQ1ZmY0ZTQtYjlkNC00MzhjLWJjNjYtOGZiNzAzYWZmYWY2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
      rating: 4.6,
      price: 220,
      isActive: true
    },
    // Movies - English
    {
      _id: '6',
      title: 'Avatar: The Way of Water',
      category: 'movies',
      language: 'English',
      genreOrType: 'Sci-Fi/Adventure',
      description: 'Jake Sully and his family face ancient threats on Pandora, seeking refuge with oceanic clans in stunning underwater sequences and breathtaking visuals.',
      location: { city: 'Bangalore', venue: 'PVR Forum Mall' },
      dateTime: new Date('2024-12-25T21:30:00'),
      durationMinutes: 192,
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg',
      rating: 4.8,
      price: 300,
      isActive: true
    },
    {
      _id: '7',
      title: 'Top Gun: Maverick',
      category: 'movies',
      language: 'English',
      genreOrType: 'Action/Drama',
      description: 'After thirty years, Maverick trains elite pilots for a dangerous mission while confronting his past in spectacular aerial sequences and emotional depth.',
      location: { city: 'Hyderabad', venue: 'AMB Cinemas' },
      dateTime: new Date('2024-12-27T20:30:00'),
      durationMinutes: 131,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
      rating: 4.9,
      price: 280,
      isActive: true
    },
    // More English Movies
    {
      _id: '8',
      title: 'Avengers: Endgame',
      category: 'movies',
      language: 'English',
      genreOrType: 'Action/Sci-Fi',
      description: 'The Avengers assemble to reverse Thanos snap and restore the universe through time travel, ultimate sacrifices, and spectacular action sequences throughout.',
      location: { city: 'Mumbai', venue: 'IMAX Wadala' },
      dateTime: new Date('2024-12-28T19:00:00'),
      durationMinutes: 181,
      posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      rating: 4.9,
      price: 350,
      isActive: true
    },
    {
      _id: '9',
      title: 'We Live in Time',
      category: 'movies',
      language: 'English',
      genreOrType: 'Romance/Drama',
      description: 'A couple navigates relationship highs and lows across different time periods in this emotional romance drama featuring heartfelt performances and touching moments.',
      location: { city: 'Delhi', venue: 'PVR Select City Walk' },
      dateTime: new Date('2024-12-29T20:30:00'),
      durationMinutes: 108,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTRlLWJiZTYtMGVmOGVmOGVlOWMxXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
      rating: 4.4,
      price: 280,
      isActive: true
    },
    {
      _id: '10',
      title: 'Five Feet Apart',
      category: 'movies',
      language: 'English',
      genreOrType: 'Romance/Drama',
      description: 'Two teenagers with cystic fibrosis fall in love but must stay six feet apart in this emotional romance featuring heartbreaking performances throughout.',
      location: { city: 'Bangalore', venue: 'Cinepolis Forum Mall' },
      dateTime: new Date('2024-12-30T18:30:00'),
      durationMinutes: 116,
      posterUrl: 'https://image.tmdb.org/t/p/w500/kreTuJBkUjVWePRfhHZuYfhNE1T.jpg',
      rating: 4.2,
      price: 250,
      isActive: true
    },
    {
      _id: '11',
      title: 'Spider-Man: No Way Home',
      category: 'movies',
      language: 'English',
      genreOrType: 'Action/Adventure',
      description: 'Spider-Man faces villains from alternate realities in this epic multiverse adventure featuring spectacular action sequences and emotional character development throughout the film.',
      location: { city: 'Chennai', venue: 'Luxe Cinemas' },
      dateTime: new Date('2024-12-31T21:00:00'),
      durationMinutes: 148,
      posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      rating: 4.8,
      price: 320,
      isActive: true
    },
    // Telugu Movies
    {
      _id: '12',
      title: 'RRR',
      category: 'movies',
      language: 'Telugu',
      genreOrType: 'Action/Drama',
      description: 'A fictional story about two legendary revolutionaries and their journey away from home featuring epic battles, friendship, and spectacular visual effects throughout.',
      location: { city: 'Hyderabad', venue: 'AMB Cinemas' },
      dateTime: new Date('2025-01-01T19:30:00'),
      durationMinutes: 187,
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
      rating: 4.9,
      price: 200,
      isActive: true
    },
    {
      _id: '13',
      title: 'Pushpa: The Rise',
      category: 'movies',
      language: 'Telugu',
      genreOrType: 'Action/Crime',
      description: 'A laborer rises through the ranks of a red sandalwood smuggling syndicate in this intense action crime drama featuring powerful performances throughout.',
      location: { city: 'Vijayawada', venue: 'PVR Cinemas' },
      dateTime: new Date('2025-01-02T20:00:00'),
      durationMinutes: 179,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTkwOTQ0ODg0M15BMl5BanBnXkFtZTgwMTkxNjQ3NjM@._V1_FMjpg_UX1000_.jpg',
      rating: 4.6,
      price: 180,
      isActive: true
    },
    {
      _id: '14',
      title: 'Baahubali 2: The Conclusion',
      category: 'movies',
      language: 'Telugu',
      genreOrType: 'Action/Drama',
      description: 'Shiva learns about his heritage and seeks to avenge his father Baahubali in this epic conclusion featuring spectacular battles and emotional revelations.',
      location: { city: 'Warangal', venue: 'Sudarshan Theatre' },
      dateTime: new Date('2025-01-03T18:00:00'),
      durationMinutes: 167,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTMxMTQ1MjktNWQ1MS00YTU4LWE4NjYtMGVlY2NiZmY4MmJhXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_FMjpg_UX1000_.jpg',
      rating: 4.8,
      price: 150,
      isActive: true
    },
    {
      _id: '15',
      title: 'Arjun Reddy',
      category: 'movies',
      language: 'Telugu',
      genreOrType: 'Romance/Drama',
      description: 'A surgeon with anger management issues goes on a self-destructive path after a breakup in this intense romance drama featuring raw emotions.',
      location: { city: 'Vizag', venue: 'INOX CMR Central' },
      dateTime: new Date('2025-01-04T21:30:00'),
      durationMinutes: 182,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTRlLWJiZTYtMGVmOGVmOGVlOWMxXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
      rating: 4.3,
      price: 170,
      isActive: true
    },
  ];

  private shows: Show[] = [
    { id: '1', eventId: '1', theatreId: 'th1', showTime: new Date('2024-12-25T19:30:00'), totalSeats: 200, availableSeats: 150 },
    { id: '2', eventId: '1', theatreId: 'th1', showTime: new Date('2024-12-25T22:30:00'), totalSeats: 200, availableSeats: 180 },
    { id: '3', eventId: '2', theatreId: 'th2', showTime: new Date('2024-12-26T21:00:00'), totalSeats: 250, availableSeats: 200 },
    { id: '4', eventId: '3', theatreId: 'th3', showTime: new Date('2024-12-27T18:00:00'), totalSeats: 300, availableSeats: 250 },
    { id: '5', eventId: '4', theatreId: 'th4', showTime: new Date('2024-12-25T20:00:00'), totalSeats: 400, availableSeats: 350 },
    { id: '6', eventId: '5', theatreId: 'th5', showTime: new Date('2024-12-26T19:00:00'), totalSeats: 350, availableSeats: 300 },
    { id: '7', eventId: '6', theatreId: 'th6', showTime: new Date('2024-12-25T21:30:00'), totalSeats: 500, availableSeats: 450 },
    { id: '8', eventId: '7', theatreId: 'th7', showTime: new Date('2024-12-27T20:30:00'), totalSeats: 300, availableSeats: 280 },
    { id: '9', eventId: '8', theatreId: 'th8', showTime: new Date('2024-12-28T19:00:00'), totalSeats: 500, availableSeats: 450 },
    { id: '10', eventId: '9', theatreId: 'th9', showTime: new Date('2024-12-29T20:30:00'), totalSeats: 200, availableSeats: 180 },
    { id: '11', eventId: '10', theatreId: 'th10', showTime: new Date('2024-12-30T18:30:00'), totalSeats: 250, availableSeats: 220 },
    { id: '12', eventId: '11', theatreId: 'th11', showTime: new Date('2024-12-31T21:00:00'), totalSeats: 400, availableSeats: 380 },
    { id: '13', eventId: '12', theatreId: 'th12', showTime: new Date('2025-01-01T19:30:00'), totalSeats: 350, availableSeats: 300 },
    { id: '14', eventId: '13', theatreId: 'th13', showTime: new Date('2025-01-02T20:00:00'), totalSeats: 300, availableSeats: 250 },
    { id: '15', eventId: '14', theatreId: 'th14', showTime: new Date('2025-01-03T18:00:00'), totalSeats: 400, availableSeats: 350 },
    { id: '16', eventId: '15', theatreId: 'th15', showTime: new Date('2025-01-04T21:30:00'), totalSeats: 250, availableSeats: 200 }
  ];

  getAllEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    const filteredEvents = this.events.filter(event => event.category === category);
    return of(filteredEvents);
  }

  getEventById(id: string): Observable<Event | undefined> {
    const event = this.events.find(event => event._id === id);
    return of(event);
  }

  getShowsForEvent(eventId: string): Observable<Show[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day
    const mockShows: Show[] = [];
    
    // Generate shows for 7 days (1 week)
    for (let day = 0; day < 7; day++) {
      const showDate = new Date(today);
      showDate.setDate(today.getDate() + day);
      
      // Generate 4 shows per day with different timings
      const showTimes = [
        { hour: 9, minute: 30 },   // Morning show
        { hour: 13, minute: 15 },  // Afternoon show
        { hour: 17, minute: 0 },   // Evening show
        { hour: 21, minute: 30 }   // Night show
      ];
      
      showTimes.forEach((time, index) => {
        const showDateTime = new Date(showDate);
        showDateTime.setHours(time.hour, time.minute, 0, 0);
        const now = new Date();
        const isWeekend = showDate.getDay() === 0 || showDate.getDay() === 6;
        
        mockShows.push({
          id: `show-${eventId}-day${day}-${index}`,
          eventId: eventId,
          theatreId: 'theatre-1',
          showTime: showDateTime,
          availableSeats: isWeekend ? Math.floor(Math.random() * 50) + 30 : Math.floor(Math.random() * 100) + 150,
          totalSeats: 318,
          disabled: showDateTime <= now
        });
      });
    }
    
    return of(mockShows);
  }

  searchEvents(query: string): Observable<Event[]> {
    const filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.genreOrType.toLowerCase().includes(query.toLowerCase()) ||
      event.location.city.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredEvents);
  }
}