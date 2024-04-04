<?php

namespace Fluent\Cors;

use Fluent\Cors\Config\Cors;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class ServiceCors
{
    private array $allowedOrigins = [];
    private array $allowedOriginsPatterns = [];
    private array $allowedMethods = [];
    private array $allowedHeaders = [];
    private array $exposedHeaders = [];
    private bool $supportsCredentials = false;
    private ?int $maxAge = 0;
    private bool $allowAllOrigins = false;
    private bool $allowAllMethods = false;
    private bool $allowAllHeaders = false;

    public function __construct(?Cors $config = null)
    {
        if ($config) {
            $this->setOptions($config);
        }
    }

    public function setOptions(Cors $config): void
    {
        $this->allowedOrigins = $config->allowedOrigins;
        $this->allowedOriginsPatterns = $config->allowedOriginsPatterns;
        $this->allowedMethods = $config->allowedMethods;
        $this->allowedHeaders = $config->allowedHeaders;
        $this->supportsCredentials = $config->supportsCredentials;
        $this->maxAge = $config->maxAge;
        $this->exposedHeaders = $config->exposedHeaders;

        $this->normalizeOptions();
    }

    private function normalizeOptions(): void
    {
        $this->allowedHeaders = array_map('strtolower', $this->allowedHeaders);
        $this->allowedMethods = array_map('strtoupper', $this->allowedMethods);
        $this->allowAllOrigins = in_array('*', $this->allowedOrigins);
        $this->allowAllHeaders = in_array('*', $this->allowedHeaders);
        $this->allowAllMethods = in_array('*', $this->allowedMethods);

        if (!$this->allowAllOrigins) {
            foreach ($this->allowedOrigins as $origin) {
                if (strpos($origin, '*') !== false) {
                    $this->allowedOriginsPatterns[] = $this->convertWildcardToPattern($origin);
                }
            }
        }
    }

    private function convertWildcardToPattern($pattern)
    {
        $pattern = preg_quote($pattern, '#');
        $pattern = str_replace('\*', '.*', $pattern);

        return '#^' . $pattern . '\z#u';
    }

    public function isCorsRequest(RequestInterface $request): bool
    {
        return $request->hasHeader('Origin');
    }

    public function isPreflightRequest(RequestInterface $request): bool
    {
        return $request->getMethod(true) === 'OPTIONS' && $request->hasHeader('Access-Control-Request-Method');
    }

    public function handlePreflightRequest(RequestInterface $request): ResponseInterface
    {
        $response = service('response')->setStatusCode(204);
        $response = $this->addPreflightRequestHeaders($response, $request);

        return $response;
    }

    public function addPreflightRequestHeaders(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        $response = $this->configureAllowedOrigin($response, $request);

        if ($response->hasHeader('Access-Control-Allow-Origin')) {
            $response = $this->configureAllowCredentials($response, $request);
            $response = $this->configureAllowedMethods($response, $request);
            $response = $this->configureAllowedHeaders($response, $request);
            $response = $this->configureMaxAge($response, $request);
        }

        return $response;
    }

    public function isOriginAllowed(RequestInterface $request): bool
    {
        if ($this->allowAllOrigins === true) {
            return true;
        }

        $origin = (string) $request->getHeaderLine('Origin');

        if (in_array($origin, $this->allowedOrigins)) {
            return true;
        }

        foreach ($this->allowedOriginsPatterns as $pattern) {
            if (preg_match($pattern, $origin)) {
                return true;
            }
        }

        return false;
    }

    public function addActualRequestHeaders(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        $response = $this->configureAllowedOrigin($response, $request);

        if ($response->hasHeader('Access-Control-Allow-Origin')) {
            $response = $this->configureAllowCredentials($response, $request);
            $response = $this->configureExposedHeaders($response, $request);
        }

        return $response;
    }

    private function configureAllowedOrigin(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if ($this->allowAllOrigins === true && !$this->supportsCredentials) {
            $response = $response->setHeader('Access-Control-Allow-Origin', '*');
        } elseif ($this->isSingleOriginAllowed()) {
            $response = $response->setHeader('Access-Control-Allow-Origin', array_values($this->allowedOrigins)[0]);
        } else {
            if ($this->isCorsRequest($request) && $this->isOriginAllowed($request)) {
                $response = $response->setHeader('Access-Control-Allow-Origin', (string) $request->getHeaderLine('Origin'));
            }

            $response = $this->varyHeader($response, 'Origin');
        }

        return $response;
    }

    private function isSingleOriginAllowed(): bool
    {
        if ($this->allowAllOrigins === true || count($this->allowedOriginsPatterns) > 0) {
            return false;
        }

        return count($this->allowedOrigins) === 1;
    }

    private function configureAllowedMethods(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if ($this->allowAllMethods === true) {
            $allowMethods = strtoupper((string) $request->getHeaderLine('Access-Control-Request-Method'));
            $response = $this->varyHeader($response, 'Access-Control-Request-Method');
        } else {
            $allowMethods = implode(', ', $this->allowedMethods);
        }

        $response = $response->setHeader('Access-Control-Allow-Methods', $allowMethods);

        return $response;
    }

    private function configureAllowedHeaders(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if ($this->allowAllHeaders === true) {
            $allowHeaders = $request->getHeaderLine('Access-Control-Request-Headers');
            $response = $this->varyHeader($response, 'Access-Control-Request-Headers');
        } else {
            $allowHeaders = implode(', ', $this->allowedHeaders);
        }

        $response = $response->setHeader('Access-Control-Allow-Headers', $allowHeaders);

        return $response;
    }

    private function configureAllowCredentials(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if ($this->supportsCredentials === true) {
            $response = $response->setHeader('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }

    private function configureExposedHeaders(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if (empty($this->exposedHeaders)) {
            return $response;
        }

        $response = $response->setHeader('Access-Control-Expose-Headers', implode(', ', $this->exposedHeaders));

        return $response;
    }

    private function configureMaxAge(ResponseInterface $response, RequestInterface $request): ResponseInterface
    {
        if ($this->maxAge !== null) {
            $response = $response->setHeader('Access-Control-Max-Age', (string) $this->maxAge);
        }

        return $response;
    }

    private function varyHeader(ResponseInterface $response, string $header): ResponseInterface
    {
        $varyHeader = $response->getHeaderLine('Vary');
        $headers = explode(', ', $varyHeader);

        if (!in_array($header, $headers)) {
            $headers[] = $header;
        }

        return $response->setHeader('Vary', implode(', ', $headers));
    }
}
