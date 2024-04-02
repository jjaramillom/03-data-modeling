import fs from 'node:fs'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

await prisma.user.deleteMany()

await prisma.user.create({
	data: {
		email: faker.internet.email(),
		username: faker.internet.userName(),
		name: faker.person.fullName(),
		notes: {
			create: [
				{
					id: 'd27a197e',
					title: faker.lorem.sentence(),
					content: faker.lorem.paragraph(),
					images: {
						create: [
							{
								altText: 'an adorable koala cartoon illustration',
								contentType: 'image/png',
								blob: await fs.promises.readFile(
									'./tests/fixtures/images/kody-notes/cute-koala.png',
								),
							},
							{
								altText: 'a cartoon illustration of a koala in a tree eating',
								contentType: 'image/png',
								blob: await fs.promises.readFile(
									'./tests/fixtures/images/kody-notes/koala-eating.png',
								),
							},
						],
					},
				},
			],
		},
	},
})
