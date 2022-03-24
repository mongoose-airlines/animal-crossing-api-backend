import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addVillager(req, res) {
  req.body.name = req.body.name['name-USen']
  req.body.birthday_string = req.body['birthday-string']
  req.body.catch_phrase = req.body['catch-phrase']
  req.body.bubble_color = req.body['bubble-color']
  req.body.text_color = req.body['text-color']
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.villagers.push(req.body)
    profile.save()
    .then(updatedProfile => {
      res.json(updatedProfile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  // respond with updated profile
}

function show(req, res) {
  console.log(req.params.id)
  Profile.findById(req.params.id)
  .then(profile => res.json(profile))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function removeVillager(req, res) {
  console.log(req.params.villagerName)
  Profile.findById(req.user.profile)
  .then(profile => {
    const idx = profile.villagers.findIndex(villager => villager.name === req.params.villagerName)
    profile.villagers[idx].remove()
    profile.save()
    .then(savedProfile => {
      res.json(savedProfile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export { 
  index,
  addVillager,
  show,
  removeVillager
}
