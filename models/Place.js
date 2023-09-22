export default class Place {
  constructor(title, imageUri, location) {
    if (typeof title !== "string" || title.length < 1) {
      throw new Error("Invalid title");
    }
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toUTCString + Math.random().toString();
  }
}
