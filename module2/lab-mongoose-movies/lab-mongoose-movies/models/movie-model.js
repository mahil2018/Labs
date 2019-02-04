const Schema   = mongoose.Schema;
//Build Celebrity Schema
const movieSchema = new Schema({
  title: String,
  genre: String,
  Plot: String,
  cast: {type: Schema.Types.ObjectId, ref: 'Celebrity'}
}, {
  //Keep record on when document is created or updated
  timestamps: true
});
//Make Celebrity a mongoose model
const Movie = mongoose.model("Movie", celebritySchema);

//Export Author Module to make it available in other files 
module.exports =  Movie;