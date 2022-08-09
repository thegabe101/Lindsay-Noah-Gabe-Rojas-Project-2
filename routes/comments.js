// Function for comment post (still working on it)
// module.exports = (app) => {
//     app.post('/', (req, res) => {
//         const comment = new Comment(req.body);
//         comment.author = req.user._id;
//         comment
//             .save()
//             .then(() => Promise.all([
//                 Post.findById(req.params.postId),
//             ]))
//             .then(([post]) => {
//                 post.comments.unshift(comment);
//                 return Promise.all([
//                     post.save(),
//                 ]);
//             })
//             .then(() => res.redirect(`/${req.params.postId}`))
//             .catch((err) => {
//                 console.log(err);
//             });
//     });
// };
