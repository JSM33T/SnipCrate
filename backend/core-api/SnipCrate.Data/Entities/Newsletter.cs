namespace SnipCrate.Data.Entities
{
    public class Newsletter
    {
        public int Id { get; set; }
        public Guid RowGuid { get; set; } = Guid.NewGuid();
        public DateTime DateAdded { get; set; }
        public required string Email { get; set; }
        public bool IsActive { get; set; }
        public bool Verified { get; set; }
    }
}
