const Playlist = require('../model/Playlist');
const User = require('../model/User');

const getAllPlaylist = async (req, res) => {
    const playlist = await Playlist.find();
    if (!playlist) return res.status(204).json({ 'message': 'No playlists found' });
    res.json(playlist);
}

const deletePlaylist = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Playlist ID required' });
    const playlist = await Playlist.findOne({ _id: req.body.id }).exec();
    if (!playlist) {
        return res.status(204).json({ 'message': `Playlist ID ${req.body.id} not found` });
    }
    const result = await Playlist.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getPlaylist = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Playlist ID required' });
    const playlist = await Playlist.findOne({ _id: req.params.id }).exec();
    if (!playlist) {
        return res.status(204).json({ 'message': `Playlist ID ${req.params.id} not found` });
    }
    res.json(playlist);
}

const createPlaylist = async(req, res) => {

	const { playlistname, username } = req.body;
	console.log("Helloo", req.user)
    if (!playlistname || !username ) return res.status(400).json({ 'message': 'Username and playlist name are required.' });

    // check for duplicate usernames in the db
    const duplicate = await Playlist.findOne({ playlistname: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //create and store the new playlist 
        const result1 = await Playlist.create({
            "playlistname": playlistname,
            "username": username,
			"movies": []
        });
		
		// update user to contain the playlist
		const user = await User.findOne({ username: username})
		user.playlists.push(playlistname)
		const result2 = await user.save()

        console.log(result1, result2);

        res.status(201).json({ 'success': `New Playlist ${playlistname} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const addToPlaylist = async (req, res) => {

    if (!req?.params?.id) return res.status(400).json({ "message": 'Playlist name required' });
	const playlistname = req.params.id
	const { imdbID } = req.body;
	if (!playlistname || !imdbID) return res.status(400).json({ 'message': 'imdbID required.' });

	try {
		const playlist = await Playlist.findOne({ playlistname: playlistname })
		playlist.movies.push(imdbID)
		const result = await playlist.save()

		console.log(result)

        res.status(201).json({ 'success': `New Movie ${imdbID} added to ${playlistname}!` });
	} catch (err) {
        res.status(500).json({ 'message': err.message });
	}
}
// User (username, pswd, [playlistIDs])


module.exports = {
	getAllPlaylist,
	getPlaylist,
	deletePlaylist,
	createPlaylist,
	addToPlaylist
}