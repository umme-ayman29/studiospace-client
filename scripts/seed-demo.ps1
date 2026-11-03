$ErrorActionPreference = 'Stop'
$api = 'http://localhost:5000'
$json = 'application/json'

function Get-Session($name, $email, $password) {
  $reg = @{ name = $name; email = $email; password = $password } | ConvertTo-Json
  try {
    Invoke-RestMethod -Method Post -Uri "$api/auth/register" -ContentType $json -Body $reg | Out-Null
  } catch { }
  $login = @{ email = $email; password = $password } | ConvertTo-Json
  Invoke-RestMethod -Method Post -Uri "$api/auth/login" -ContentType $json -Body $login -SessionVariable s | Out-Null
  return $s
}

$host1 = Get-Session 'Test Host' 'test@example.com' 'Test12'
$guest = Get-Session 'Guest Creator' 'guest@example.com' 'Guest12'

$studios = @(
  @{
    title = 'Aperture White Cyc Wall Studio'; category = 'photo-studio'
    hourlyRate = 45; securityDeposit = 100; maxCapacity = 8
    location = 'Gulshan, Dhaka'
    image = 'https://picsum.photos/seed/studio1/1200/800'
    amenities = @('Seamless cyc wall', 'Strobe lights', 'Softboxes', 'Makeup station', 'Free WiFi')
    overview = 'A bright 800 sq ft photography studio with a seamless white cyclorama wall, three strobe heads and a dedicated makeup corner. Ideal for portraits, fashion lookbooks and product shoots.'
    reviews = @(@{ rating = 5; comment = 'Spotless cyc wall and the lights were already set up. Saved us an hour.' })
  },
  @{
    title = 'Spotlight Cinema Sound Stage'; category = 'film-stage'
    hourlyRate = 120; securityDeposit = 300; maxCapacity = 40
    location = 'Agrabad, Chattogram'
    image = 'https://picsum.photos/seed/studio2/1200/800'
    amenities = @('Soundproofed stage', 'Lighting grid', 'Green screen', 'Green room', 'Power backup')
    overview = 'A full soundproofed film stage with an overhead lighting grid, green screen wall and a separate green room. Built for short films, music videos and commercial productions.'
    reviews = @(@{ rating = 5; comment = 'Great acoustics and plenty of power for our camera crew.' }, @{ rating = 4; comment = 'Spacious stage. Parking was a little tight on shoot day.' })
  },
  @{
    title = 'Soundwave Podcast Lounge'; category = 'podcast-lounge'
    hourlyRate = 30; securityDeposit = 50; maxCapacity = 5
    location = 'Sonadanga, Khulna'
    image = 'https://picsum.photos/seed/studio3/1200/800'
    amenities = @('4 broadcast mics', 'Acoustic panels', 'Mixer board', 'Comfy sofas', 'Air conditioning')
    overview = 'A cosy acoustically treated lounge with four broadcast microphones and a mixer, perfect for interview podcasts and live streams with up to five guests.'
    reviews = @(@{ rating = 4; comment = 'Clean audio right out of the box. Very comfortable seating.' })
  },
  @{
    title = 'Echo Chamber Recording Suite'; category = 'music-suite'
    hourlyRate = 65; securityDeposit = 150; maxCapacity = 6
    location = 'Zindabazar, Sylhet'
    image = 'https://picsum.photos/seed/studio4/1200/800'
    amenities = @('Vocal booth', 'Pro monitors', 'Audio interface', 'Upright piano', 'Engineer on request')
    overview = 'A two-room recording suite with an isolated vocal booth, studio monitors and a well-tuned upright piano. Engineer assistance is available on request.'
    reviews = @(@{ rating = 5; comment = 'The vocal booth sounds fantastic and the piano is perfectly tuned.' }, @{ rating = 5; comment = 'Recorded our whole EP here in two sessions.' })
  },
  @{
    title = 'Canvas and Clay Art Workshop'; category = 'workshop'
    hourlyRate = 25; securityDeposit = 40; maxCapacity = 15
    location = 'Boalia, Rajshahi'
    image = 'https://picsum.photos/seed/studio5/1200/800'
    amenities = @('Large work tables', 'Natural daylight', 'Easels', 'Sink and storage', 'Free WiFi')
    overview = 'An airy daylight workshop with big work tables, easels and storage racks. A great fit for painting classes, ceramics sessions and small creative meetups.'
    reviews = @(@{ rating = 4; comment = 'Lovely natural light and lots of table space for our class.' })
  },
  @{
    title = 'Seaside Loft Photo and Video Space'; category = 'photo-studio'
    hourlyRate = 55; securityDeposit = 120; maxCapacity = 10
    location = 'Kolatoli, Cox''s Bazar'
    image = 'https://picsum.photos/seed/studio6/1200/800'
    amenities = @('Natural light windows', 'Backdrop rolls', 'LED panels', 'Props closet', 'Changing room')
    overview = 'A sunlit loft with tall windows, rolls of coloured backdrops and LED panels for video. Popular with lifestyle photographers and small video crews.'
    reviews = @(@{ rating = 5; comment = 'The window light is stunning. Easy access and friendly host.' })
  }
)

foreach ($st in $studios) {
  $revs = $st.reviews
  $st.Remove('reviews')
  $body = $st | ConvertTo-Json -Depth 5
  $res = Invoke-RestMethod -Method Post -Uri "$api/studios" -ContentType $json -Body $body -WebSession $host1
  Write-Host ('Created: ' + $st.title)
  foreach ($r in $revs) {
    $rb = $r | ConvertTo-Json
    Invoke-RestMethod -Method Post -Uri ("$api/studios/" + $res.insertedId + '/reviews') -ContentType $json -Body $rb -WebSession $guest | Out-Null
  }
}
Write-Host 'Done.'