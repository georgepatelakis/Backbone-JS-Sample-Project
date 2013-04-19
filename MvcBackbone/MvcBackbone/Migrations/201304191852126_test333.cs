namespace MvcBackbone.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test333 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.stuffs");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.stuffs",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
    }
}
