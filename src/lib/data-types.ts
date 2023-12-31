export interface Movie {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: number;
  ticket_price: number;
}

export interface User {
  name: string;
  username: string;
  password: string;
  id: number;
  age: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopUpBalanceMethod {
  logoSrc: string;
  title: string;
}

export interface Transactions {
  id: number;
  movieID: number;
  movieTitle: string;
  ticketPrice: number;
  ticketCount: number;
  totalPrice: number;
  seatNumbers?: number[];
  userId: number;
  createdAt: string;
  updatedAt: string;
}
