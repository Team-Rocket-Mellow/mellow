import { Todo } from "./types"
import { nanoid } from "nanoid"

const past: Todo[] = [
   {
      id: nanoid(),
      text: "Past 1",
      done: false,
      trash: false,
      start: new Date(),
      due: new Date(2022, 4, 17),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Past 2",
      done: false,
      trash: false,
      start: new Date("2022-01-01"),
      due: new Date(2022, 6, 15),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Past 3",
      done: false,
      trash: false,
      start: new Date("2022-01-01"),
      due: new Date(2022, 2, 5),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Past 4",
      done: false,
      trash: true,
      start: new Date("2022-01-01"),
      due: new Date(2022, 3, 21),
      pending: false,
   },
]

const undated: Todo[] = [
   {
      id: nanoid(),
      text: "Undated 1",
      done: false,
      trash: false,
      start: new Date("2020-01-01"),
      due: null,
      pending: false,
   },
   {
      id: nanoid(),
      text: "Undated 2",
      done: true,
      trash: false,
      start: new Date("2020-01-01"),
      due: null,
      pending: false,
   },
   {
      id: nanoid(),
      text: "Undated 3",
      done: true,
      trash: false,
      start: new Date("2020-01-01"),
      due: null,
      pending: false,
   },
]

const future: Todo[] = [
   {
      id: nanoid(),
      text: "Future 1",
      done: false,
      trash: false,
      start: new Date(),
      due: new Date(2022, 9, 1,),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Future 2",
      done: false,
      trash: false,
      start: new Date("2025-01-01"),
      due: new Date("2022-10-15"),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Future 3",
      done: false,
      trash: false,
      start: new Date("2025-01-01"),
      due: new Date(2022, 11, 3),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Future 4",
      done: false,
      trash: false,
      start: new Date("2022-01-01"),
      due: new Date(2023, 11, 10),
      pending: false,
   },
]

const today: Todo[] = [
   {
      id: nanoid(),
      text: "Today 1",
      done: false,
      trash: false,
      start: new Date(),
      due: new Date(),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Today 2",
      done: false,
      trash: false,
      start: new Date(),
      due: new Date(),
      pending: false,
   },
   {
      id: nanoid(),
      text: "Today 3",
      done: true,
      trash: false,
      start: new Date(),
      due: new Date(),
      pending: false,
   },
]

export default undated
   .concat(past)
   .concat(today)
   .concat(future)