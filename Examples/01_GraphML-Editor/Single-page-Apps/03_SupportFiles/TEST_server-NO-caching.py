#!/bin/python
import http.server

class No304NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Last-Modified', self.date_time_string())
        http.server.SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    http.server.test(HandlerClass=No304NoCacheHTTPRequestHandler)

