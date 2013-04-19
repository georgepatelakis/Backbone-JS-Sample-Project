namespace MvcBackbone.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test333d : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Stuffs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Stuffs");
        }
    }
}
