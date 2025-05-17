<script>
	import { enhance } from '$app/forms';

	const { article, user } = $props();
</script>

<style>
	.article-meta {
		display: flex;
	}
  </style>

<div class="article-meta">
	<div>
		<a href="/profile/@{article.author.username}">
			<img src={article.author.image} alt={article.author.username} />
		</a>
	
		<div class="info">
			<a href="/profile/@{article.author.username}" class="author">{article.author.username}</a>
			<span class="date">
				{new Date(article.createdAt).toDateString()}
			</span>
		</div>
	</div>
	

	{#if article.author.username === user?.username}
		<a href="/editor/{article.slug}" class="btn btn-outline-secondary btn-sm">
			<i class="ion-edit"></i> Edit Article
		</a>

		<form use:enhance method="POST" action="?/deleteArticle">
			<button class="btn btn-outline-danger btn-sm">
				<i class="ion-trash-a"></i> Delete Article
			</button>
		</form>
	{:else if user}
		<form
			id="follow"
			method="POST"
			action="/profile/@{article.author.username}?/toggleFollow"
			use:enhance={({form}) => {
				// optimistic UI
				article.author.following = !article.author.following;

				return ({ result, update }) => {
					update();
				};
			}}
		>
			<input hidden type="checkbox" name="following" checked={article.author.following} />
			<button
				class="btn btn-sm action-btn"
				class:btn-secondary={article.author.following}
				class:btn-outline-secondary={!article.author.following}
			>
				<i class="ion-plus-round"></i>
				{article.author.following ? 'Unfollow' : 'Follow'}
				{article.author.username}
			</button>
		</form>
		<form
			id= "favorite"
			method="POST"
			action="/article/{article.slug}?/toggleFavorite"
			use:enhance={({ form }) => {
				// optimistic UI
				if (article.favorited) {
					article.favorited = false;
					article.favoritesCount -= 1;
				} else {
					article.favorited = true;
					article.favoritesCount += 1;
				}
				return ({ result, update }) => {
					update();
				};
			}}
		>
			<input hidden type="checkbox" name="favorited" checked={article.favorited} />
			<button class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}">
				<i class="ion-heart"></i>
				{article.favoritesCount}
			</button>
		</form>
	{:else}
		<button
			class="btn btn-sm action-btn"
			class:btn-secondary={article.author.following}
			class:btn-outline-secondary={!article.author.following}
		>
			<i class="ion-plus-round"></i>
			<a href="/login">
				{article.author.following ? 'Unfollow' : 'Follow'}
				{article.author.username}
			</a>
		</button>
		<button class="btn btn-sm btn-outline-primary">
			<a href="/login">
				<i class="ion-heart"></i>
				Favorite Article
				({article.favoritesCount})
			</a>
		</button>
	{/if}
</div>
