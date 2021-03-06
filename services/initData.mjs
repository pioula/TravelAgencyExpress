import db from "./database.mjs";

let tripData = [{
  title: 'Luxury Cribbean vacations',
  offer_description: 'A trip to Caribbean',
  price: 1337,
  img: 'images/havana.jpg',
  trip_description: "Whether you're looking to \
    relax on the beach, \
    play water sports, go on an \
    adventurous hike, \
    or get the most fabulous massage you've ever \
    experienced, luxury Caribbean vacations offer \
    something for everyone. Each Caribbean island \
    is unique, from its people and culture to its \
    array of activities. Whatever you envision for \
    your custom Caribbean vacation, we'll create \
    it – custom-crafted just for you by your Caribbean \
    travel agent. From Turks and Caicos known for \
    its spas and world-class facilities to St \
    Maarten featuring the gorgeous Orient Beach \
    and shopping on the famed Front Street, to \
    remarkable and alluring Cuba, or a little-known, \
    quiet island, the Caribbean islands deliver every \
    kind of adventure. A custom Caribbean vacation is \
    just waiting for you.",
    beg_date: '05.10.2022GMT',
    end_date: '06.28.2023GMT',
    tickets_left: 13,
},
{
  title: 'Cuba is C00l',
  offer_description: 'A trip to Cuba',
  price: 2137,
  img: 'images/cuba.jpg',
  trip_description: "Whether you're looking to \
    relax on the beach, \
    play water sports, go on an \
    adventurous hike, \
    or get the most fabulous massage you've ever \
    experienced, luxury Caribbean vacations offer \
    something for everyone. Each Caribbean island \
    is unique, from its people and culture to its \
    array of activities. Whatever you envision for \
    your custom Caribbean vacation, we'll create \
    it – custom-crafted just for you by your Caribbean \
    travel agent. From Turks and Caicos known for \
    its spas and world-class facilities to St \
    Maarten featuring the gorgeous Orient Beach \
    and shopping on the famed Front Street, to \
    remarkable and alluring Cuba, or a little-known, \
    quiet island, the Caribbean islands deliver every \
    kind of adventure. A custom Caribbean vacation is \
    just waiting for you.",
    beg_date: '05.22.2023GMT',
    end_date: '06.27.2023GMT',
    tickets_left: 13,
},
{
  title: 'Costa Rica is the best',
  offer_description: 'A trip to Consta Rica',
  price: 7008,
  img: 'images/costa_rica.jpg',
  trip_description: "Whether you're looking to \
    relax on the beach, \
    play water sports, go on an \
    adventurous hike, \
    or get the most fabulous massage you've ever \
    experienced, luxury Caribbean vacations offer \
    something for everyone. Each Caribbean island \
    is unique, from its people and culture to its \
    array of activities. Whatever you envision for \
    your custom Caribbean vacation, we'll create \
    it – custom-crafted just for you by your Caribbean \
    travel agent. From Turks and Caicos known for \
    its spas and world-class facilities to St \
    Maarten featuring the gorgeous Orient Beach \
    and shopping on the famed Front Street, to \
    remarkable and alluring Cuba, or a little-known, \
    quiet island, the Caribbean islands deliver every \
    kind of adventure. A custom Caribbean vacation is \
    just waiting for you.",
  beg_date: '05.20.2023GMT',
  end_date: '06.26.2023GMT',
  tickets_left: 13,
}];

let reservationData = [
  {
    TripId: 1,
    name: 'Piotr',
    lastName: 'Ulanowski',
    email: 'a@b.cd',
    tickets: '1'
  }
]

let users = [
  {
    name: "John",
    lastName: "Doe",
    email: "email@mail.com",
    password: "mySecret123",
  }
]

tripData.forEach((trip) => db.Trip.create(trip));
//reservationData.forEach((reservation) => db.Reservation.create(reservation));
// users.forEach((user) => db.User.create(user));
console.log("Done!");