const DELETE_RETENTION_DAYS = 30;

export const getRemainingDeletionDays = (
  deletedAt: string | Date,
  retentionDays: number = DELETE_RETENTION_DAYS,
): number => {
  const deletedDate = new Date(deletedAt);
  const now = new Date();

  const diffTime = now.getTime() - deletedDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, retentionDays - diffDays);
};
