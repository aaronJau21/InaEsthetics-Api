-- CreateEnum
CREATE TYPE "RolesUsuarios" AS ENUM ('ADMINISTRADOR', 'USUARIOS', 'MARKETING');

-- CreateEnum
CREATE TYPE "RoleTrabajadores" AS ENUM ('DIRECTORA_MEDICA', 'DIRECTOR_MEDICO', 'MEDICO_CIRUJANO', 'DERMATOLOGO', 'ASISTENTE_MEDICO', 'ADMISIONISTA');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'CARNET_ESTRANJERIA');

-- CreateEnum
CREATE TYPE "TipoTratamiento" AS ENUM ('FACIALES', 'CORPORALES', 'MEDICINA_ESTETICA', 'DERMATOLOGIA_ESTETICA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RolesUsuarios" NOT NULL DEFAULT 'USUARIOS',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trabajadores" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "role" "RoleTrabajadores" NOT NULL DEFAULT 'ADMISIONISTA',
    "descripcion" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trabajadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distritos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "usersId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "numero_contacto" TEXT NOT NULL,
    "correo_electronico" TEXT NOT NULL,
    "tipo_documento" "TipoDocumento" NOT NULL DEFAULT 'DNI',
    "numero_cocumento" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "referencia" TEXT,
    "usersId" INTEGER NOT NULL,
    "frecuencia" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tratamientos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT[],
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "especialidad" "TipoTratamiento" NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usersId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tratamientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usersId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsImages" (
    "id" SERIAL NOT NULL,
    "images" TEXT,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductsImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TratamientosImages" (
    "id" SERIAL NOT NULL,
    "images" TEXT,
    "tratamiento_id" INTEGER NOT NULL,

    CONSTRAINT "TratamientosImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrabajadoresImages" (
    "id" SERIAL NOT NULL,
    "images" TEXT,
    "trabajador_id" INTEGER NOT NULL,

    CONSTRAINT "TrabajadoresImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Trabajadores_nombreCompleto_key" ON "Trabajadores"("nombreCompleto");

-- CreateIndex
CREATE UNIQUE INDEX "Distritos_nombre_key" ON "Distritos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_numero_cocumento_key" ON "Clientes"("numero_cocumento");

-- CreateIndex
CREATE UNIQUE INDEX "Tratamientos_nombre_key" ON "Tratamientos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Productos_nombre_key" ON "Productos"("nombre");

-- AddForeignKey
ALTER TABLE "Trabajadores" ADD CONSTRAINT "Trabajadores_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distritos" ADD CONSTRAINT "Distritos_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tratamientos" ADD CONSTRAINT "Tratamientos_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsImages" ADD CONSTRAINT "ProductsImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TratamientosImages" ADD CONSTRAINT "TratamientosImages_tratamiento_id_fkey" FOREIGN KEY ("tratamiento_id") REFERENCES "Tratamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrabajadoresImages" ADD CONSTRAINT "TrabajadoresImages_trabajador_id_fkey" FOREIGN KEY ("trabajador_id") REFERENCES "Trabajadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
