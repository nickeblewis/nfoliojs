## Main

- The main page is split into these sections
   - Recent photo with it's short description, who it was submitted by, when and a link through to comments (which is the same as the photo, but good to have CTA)
   - Messages section (needs some thought)
   - x number of previous photo thumbnails
      - May be possible to zoom in and out 
      - A link at the bottom makes it possible to see more or.... we have infinite scroll?
   - Footer section with details of how to join, the costs and so on
   
## Hosting

- Transferring Nfolio to namecheap
- Then create a TXT record for redirection to Firebase
- nfolio.com hopefully will be ready by the time I go to Madrid

## Image hosting options

- Currently resizing and manipulating images in the client and then storing original plus variants on S3 storage
   - Problem is HTML5 canvas doesn't allow for image compression
   - Looking at Cloudinary as an option, free for many thousands of images then $35 for up to 1 million. No brainer?!
   
## Testers

- Bragi, Cassius, Sara, Mark
   - Remove their user accounts, as the system has totally changed
   - Email them to tell them that they all need to re-register (sorry) and upload at least one photo as a test
   
## Social media campaign

- Twitter, FB and G+ all have different audiences
- @nfolio has already been taken, which is a shame

## Google maps integration

- Geofire

## Selling of images

- Stripe?
- Printing services?
- Digital downloads?

## Email notification system

## Todos

- Should translate these into TDD unit tests
  - Eurgggh I have done no tests at all 
- Write directives for common pieces of HTML that are gradually coming together
  - Coming along well, though some bits have strayed from this path a bit
- Reinstate the header directive, see if it were the missing DI declaration that was left out of the other file??

## Profile Pages (u/nickeblewis, users/nickeblewis)

- Photos tab
   - Shares the photos.html template but draws the data from the users specific set of photos. Note the live update of images doesn't happen here (by design)
- Comments tab
   - Everything you've said about other peoples' shots

## Image upload

## Photo groups/sets

- How about the possibilty of uploading a set of images per entry? The idea behind this is that a title, a description (background story) may complement a set of photos better

## Launching the site with a series of photowalks

- Host a Farnborough photo walk that will be promoted through Nfolio
- Attendees can register with the site to join the walk
- Post their photos their later
- We can discuss their photos in real time at the end of the day

## Things

- The edit route isn't fully set up yet which I have been trying to get to work today. In fact it destroyed a whole node. So will need to wipe the data back to square one again!

## Test scenarios

- You must be logged in to upload a photo
- You must be logged in before being able to comment on any photo

## Tagging (and memes)


