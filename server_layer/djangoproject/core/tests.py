from django.test import TestCase

from django.urls import reverse

class searchSitesTests(TestCase):

    def test_future_question(self):
        """
        The detail view of a question with a pub_date in the future
        returns a 404 not found.
        """
        response = self.client.get(reverse('polls:index'))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
