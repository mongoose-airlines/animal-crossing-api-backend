import mongoose from 'mongoose'

const villagerSchema = new mongoose.Schema({
  name: String,
  personality: String,
  birthday_string: String,
  species: String,
  gender: String,
  hobby: String,
  catch_phrase: String,
  icon_uri: String,
  image_uri: String,
  bubble_color: String,
  text_color: String,
  saying: String
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  villagers: [villagerSchema]
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
