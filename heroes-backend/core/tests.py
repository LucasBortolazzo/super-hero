import unittest
from django.test import Client
from rest_framework import status


class heroesTest(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.baseUrl = 'http://localhost:8000/heroes/'
        self.contentType = 'application/json'
        self.defaultHeroTest = {"id": "1",
                                "name": "Test Hero",
                                "description": "note: Hero used for integration testing",
                                }

    def test_api_getAllheroes(self):
        response = self.client.get(self.baseUrl)
        self.assertEquals
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_paginate10Perpage(self):
        response = self.client.get(self.baseUrl)
        pagiante_valid = len(response.data['results']) <= 10
        self.assertEquals(True, pagiante_valid)

    def test_api_getdefaulthero(self):
        response = self.client.get(
            self.baseUrl + self.defaultHeroTest['id']+'/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_post_status201(self):
        response = self.client.post(path=self.baseUrl,
                                    data=self.defaultHeroTest,
                                    format='json',
                                    content_type=self.contentType)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

    def test_api_put_status200(self):
        response = self.client.put(path=self.baseUrl + self.defaultHeroTest['id']+'/',
                                   data=self.defaultHeroTest,
                                   format='json',
                                   content_type=self.contentType)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
