USE [master]
GO
/****** Object:  Database [EcommerceComputadoras]    Script Date: 31/05/2025 21:11:19 ******/
CREATE DATABASE [EcommerceComputadoras]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EcommerceComputadoras', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\EcommerceComputadoras.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'EcommerceComputadoras_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\EcommerceComputadoras_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [EcommerceComputadoras] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EcommerceComputadoras].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EcommerceComputadoras] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET ARITHABORT OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EcommerceComputadoras] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EcommerceComputadoras] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EcommerceComputadoras] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EcommerceComputadoras] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET RECOVERY FULL 
GO
ALTER DATABASE [EcommerceComputadoras] SET  MULTI_USER 
GO
ALTER DATABASE [EcommerceComputadoras] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EcommerceComputadoras] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EcommerceComputadoras] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EcommerceComputadoras] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EcommerceComputadoras] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EcommerceComputadoras] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'EcommerceComputadoras', N'ON'
GO
ALTER DATABASE [EcommerceComputadoras] SET QUERY_STORE = ON
GO
ALTER DATABASE [EcommerceComputadoras] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [EcommerceComputadoras]
GO
/****** Object:  Table [dbo].[Carrito]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Carrito](
	[CarID] [int] NOT NULL,
	[UsuID] [int] NULL,
	[FechCre] [datetime] NOT NULL,
	[FechMod] [datetime] NULL,
	[EstCar] [int] NULL,
 CONSTRAINT [PK_Carrito] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarritoDetalle]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarritoDetalle](
	[CarDetID] [int] NOT NULL,
	[CarID] [int] NOT NULL,
	[ProID] [int] NOT NULL,
	[CantPro] [int] NOT NULL,
	[PrecUni] [decimal](6, 2) NOT NULL,
	[FechAg] [datetime] NOT NULL,
 CONSTRAINT [PK_CarritoDetalle] PRIMARY KEY CLUSTERED 
(
	[CarDetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[CatID] [int] NOT NULL,
	[NomCat] [nvarchar](25) NOT NULL,
	[EstCat] [bit] NOT NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[CatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Marcas]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marcas](
	[MarcID] [int] NOT NULL,
	[NomMarc] [nvarchar](25) NOT NULL,
	[EstMarc] [bit] NOT NULL,
 CONSTRAINT [PK_Marcas] PRIMARY KEY CLUSTERED 
(
	[MarcID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PedidoDetalle]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PedidoDetalle](
	[PedDetID] [int] IDENTITY(1,1) NOT NULL,
	[PedID] [int] NOT NULL,
	[ProID] [int] NOT NULL,
	[NomPro] [nvarchar](200) NULL,
	[CantPro] [int] NOT NULL,
	[PreUniPro] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PedDetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pedidos]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pedidos](
	[PedID] [int] IDENTITY(1,1) NOT NULL,
	[NumPed] [nvarchar](50) NOT NULL,
	[UsuID] [int] NOT NULL,
	[FechPed] [datetime] NULL,
	[EstPed] [nvarchar](50) NULL,
	[CostoEnvio] [decimal](6, 2) NULL,
	[NomFact] [nvarchar](200) NULL,
	[DirFact] [nvarchar](500) NULL,
	[TelFact] [nvarchar](20) NULL,
	[CorFact] [nvarchar](100) NULL,
	[NomEnv] [nvarchar](200) NULL,
	[DirEnv] [nvarchar](500) NULL,
	[TelEnv] [nvarchar](20) NULL,
	[Notas] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[PedID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[NumPed] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[ProID] [int] NOT NULL,
	[NomPro] [nvarchar](60) NOT NULL,
	[DescPro] [nvarchar](200) NULL,
	[CatID] [int] NOT NULL,
	[MarcID] [int] NOT NULL,
	[PrePro] [decimal](6, 2) NOT NULL,
	[StoPro] [int] NOT NULL,
	[StoMinPro] [int] NOT NULL,
	[ImaPro] [nvarchar](255) NOT NULL,
	[EspePro] [nvarchar](250) NOT NULL,
	[GarPro] [nvarchar](100) NULL,
	[EstPro] [bit] NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[ProID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 31/05/2025 21:11:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[UsuID] [int] NOT NULL,
	[NomUsu] [nvarchar](50) NOT NULL,
	[CorUsu] [nvarchar](35) NOT NULL,
	[ConUsu] [nvarchar](20) NOT NULL,
	[TelUsu] [int] NULL,
	[EstUsu] [bit] NOT NULL,
	[RolUsu] [bit] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[UsuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Pedidos] ADD  DEFAULT (getdate()) FOR [FechPed]
GO
ALTER TABLE [dbo].[Pedidos] ADD  DEFAULT ('Pendiente') FOR [EstPed]
GO
ALTER TABLE [dbo].[Pedidos] ADD  DEFAULT ((0)) FOR [CostoEnvio]
GO
ALTER TABLE [dbo].[Carrito]  WITH CHECK ADD  CONSTRAINT [FK_Carrito_Usuarios] FOREIGN KEY([UsuID])
REFERENCES [dbo].[Usuarios] ([UsuID])
GO
ALTER TABLE [dbo].[Carrito] CHECK CONSTRAINT [FK_Carrito_Usuarios]
GO
ALTER TABLE [dbo].[CarritoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CarritoDetalle_Carrito] FOREIGN KEY([CarID])
REFERENCES [dbo].[Carrito] ([CarID])
GO
ALTER TABLE [dbo].[CarritoDetalle] CHECK CONSTRAINT [FK_CarritoDetalle_Carrito]
GO
ALTER TABLE [dbo].[CarritoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CarritoDetalle_Productos] FOREIGN KEY([ProID])
REFERENCES [dbo].[Productos] ([ProID])
GO
ALTER TABLE [dbo].[CarritoDetalle] CHECK CONSTRAINT [FK_CarritoDetalle_Productos]
GO
ALTER TABLE [dbo].[PedidoDetalle]  WITH CHECK ADD FOREIGN KEY([PedID])
REFERENCES [dbo].[Pedidos] ([PedID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PedidoDetalle]  WITH CHECK ADD FOREIGN KEY([ProID])
REFERENCES [dbo].[Productos] ([ProID])
GO
ALTER TABLE [dbo].[Pedidos]  WITH CHECK ADD FOREIGN KEY([UsuID])
REFERENCES [dbo].[Usuarios] ([UsuID])
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [FK_Productos_Categorias] FOREIGN KEY([CatID])
REFERENCES [dbo].[Categorias] ([CatID])
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [FK_Productos_Categorias]
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [FK_Productos_Marcas] FOREIGN KEY([MarcID])
REFERENCES [dbo].[Marcas] ([MarcID])
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [FK_Productos_Marcas]
GO
USE [master]
GO
ALTER DATABASE [EcommerceComputadoras] SET  READ_WRITE 
GO
