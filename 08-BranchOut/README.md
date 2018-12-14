# The problem
It is difficult to know what artists are playing nearby, and what they all sound like (easily), without going to each venue's webpage and then separately searching for the artist on YouTube or Spotify.  The goal was to pull all that in to one webpage.

# The concept
Use the SongKick API and YouTube API to pull in the data.  Populate the page based on search criteria.

# The solution
YouTube was selected because it is a free service, and contains audio and visual.
Pulled the data from SongKick and fed into an internal search using YouTube's API.  Displayed the first result (with the option to see several results) into a video player window.