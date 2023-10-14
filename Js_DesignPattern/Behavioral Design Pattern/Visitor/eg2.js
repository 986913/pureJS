/**
  implement the visitor pattern to separate Rock music from the other genres of music by creating a separate playlist. 

  First implement the RockMusicVisitor class for this purpose. it contains the visit method, which should return the rock music playlist.
  Next, you need to implement a Song class. A Song object will have the following properties: name and genre. You also need to define the two functions: getName and getGenre.
  Finally, you need to implement the MusicLibrary class. It should store a list of all the songs, regardless of the genres. You need to implement the addSong function to add a song and accept function to allow the RockMusicVisitor to visit the music library.
 */

class RockMusicVisitor {
  visit(songs) {
    return songs.filter((song) => song.genre === 'Rock').map((s) => s.name);
  }
}

class Song {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getName() {
    return this.name;
  }
  getGenre() {
    return this.genre;
  }
}

class MusicLibrary {
  constructor() {
    this.songs = [];
  }
  addSong(song) {
    this.songs.push(song);
  }
  accept(visitor) {
    return visitor.visit(this.songs);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const rockMusicVisitor = new RockMusicVisitor();
const song1 = new Song('Bohemian Rhapsody', 'Rock');
const song2 = new Song('Stairway to Heaven', 'Rock');
const song3 = new Song('Oops I did it again', 'Pop');
const song4 = new Song('Crazy', 'Country');
const musicLibrary = new MusicLibrary();

musicLibrary.addSong(song1);
musicLibrary.addSong(song2);
musicLibrary.addSong(song3);
musicLibrary.addSong(song4);

console.log(musicLibrary.accept(rockMusicVisitor)); // ["Bohemian Rhapsody","Stairway to Heaven"]
