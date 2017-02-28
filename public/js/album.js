const albumOkComputer = {
  title: 'Ok Computer',
  artist: 'Radiohead',
  label: 'Parlophone',
  year: '1997',
  albumArtUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Radiohead.okcomputer.albumart.jpg',
  songs: [
     { title: 'Airbag', duration: '4:44' },
     { title: 'Paranoid Android', duration: '6:23' },
     { title: 'Subterranean Homesick Alien', duration: '4:28' },
     { title: 'Exit Music (For a Film)', duration: '4:25'},
     { title: 'Let Down', duration: '4:59'},
     { title: 'Karma Police', duration: '4:22'},
     { title: 'Fitter Happier', duration: '1:57'},
     { title: 'Electioneering', duration: '3:51'},
     { title: 'Climbing Up the Walls', duration: '4:45'},
     { title: 'No Surprises', duration: '3:49'},
     { title: 'Lucky', duration: '4:20'},
     { title: 'The Tourist', duration: '5:25'}
  ]
}

// Creates song rows
const createSongRow = (songNumber, songName, songLength) => {
  const template =
     '<tr class="album-view-song-item">'
   + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
   + '  <td class="song-item-title">' + songName + '</td>'
   + '  <td class="song-item-duration">' + songLength + '</td>'
   + '</tr>'

  return template;
}

// Sets the current album
const setCurrentAlbum = (album) => {
  const albumTitle = document.getElementsByClassName('album-view-title')[0];
  const albumArtist = document.getElementsByClassName('album-view-artist')[0];
  const albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  const albumImage = document.getElementsByClassName('album-cover-art')[0];
  const albumSongList = document.getElementsByClassName('album-view-song-list')[0];

  albumTitle.textContent = album.title;
  albumArtist.textContent = album.artist;
  albumReleaseInfo.textContent = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  albumSongList.innerHTML = '';

  for (let i = 0; i < album.songs.length; i++) {
      albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
}

const songListContainer = document.getElementsByClassName('album-view-song-list')[0]
const songRows = document.getElementsByClassName('album-view-song-item')

// Play button template
const playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'

window.onload = () => {
  setCurrentAlbum(albumOkComputer)

  // Renders the play button when hovering over the song number
  songListContainer.addEventListener('mouseover', (event) => {
    if (event.target.parentElement.className === 'album-view-song-item') {
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate
    }
  })

  // Loop which renders the track number after mouseleave
  for (let i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function() {
      // Selects first child element, which is the song-item-number element
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number')
    })
  }

}
