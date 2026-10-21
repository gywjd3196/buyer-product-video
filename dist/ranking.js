export function verified(post) {
  return Number.isSafeInteger(post.views) && post.views >= 0 && post.mediaType === 'video' && Boolean(post.viewsCheckedAt) && Boolean(post.metricSource);
}
export function selectPosts(posts, {productId, country, limit}) {
  const candidates = posts.filter(p => (!productId || p.productIds.includes(productId)) && (!country || p.country === country));
  const ranked = candidates.filter(verified).sort((a,b) => b.views - a.views || a.id.localeCompare(b.id)).slice(0,limit);
  const references = candidates.filter(p => !verified(p)).slice(0,limit);
  return {candidates, ranked, references, complete: candidates.length > 0 && candidates.every(verified)};
}
