## Todos

- Should translate these into TDD unit tests
  - Eurgggh I have done no tests at all 
- Write directives for common pieces of HTML that are gradually coming together
  - Coming along well, though some bits have strayed from this path a bit
- Reinstate the header directive, see if it were the missing DI declaration that was left out of the other file??

## Profile Page

- Separate the full name from login fields, that should only be shown during registration steps in some way
- Add avatar via drag and drop to a bordered box (see CSS tricks website)
  - Stores a medium size and a really small thumbnail of 100x100 on S3
  - Stored under nfolio/user1/avatar/medium|thumb
- What other fields should we have on this page?

## Image upload

- How about the possibilty of uploading a set of images per entry? The idea behind this is that a title, a description (background story) may complement a set of photos better
- In the meanjs project I got a drag and drop working, so port this across.

## Square cropping

- Wipe S3 files and data - try uploading a whole bunch of Malta photos and see how their crops look.
  - May need to make some big tweaks to the algorithm for this?
  
## Launching the site with a photowalk

- Host a Farnborough photo walk that will be promoted through Nfolio
- Attendees can register with the site to join the walk
- Post their photos their later
- We can discuss their photos in real time at the end of the day

## Things

- The edit route isn't fully set up yet which I have been trying to get to work today. In fact it destroyed a whole node. So will need to wipe the data back to square one again!


