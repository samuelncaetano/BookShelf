enum Status {
  NOT_STARTED,
  STARTED,
  IN_PROGRESS,
  COMPLETED,
  ABANDONED,
}

export class BookModel {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public volume: number | null,
    public status?: Status,
  ) {}
}
