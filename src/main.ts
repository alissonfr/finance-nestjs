import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { ExceptionHandler } from "./core/exception/exception-handler"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.useGlobalFilters(new ExceptionHandler())

    app.enableVersioning({
        defaultVersion: "1",
        type: VersioningType.URI,
    })

    const config = new DocumentBuilder()
        .setTitle("Finance APP")
        .setDescription("The finance API description")
        .setVersion("1.0.0")
        .addServer("http://localhost:3000/", "Local environment")
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, documentFactory)

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
