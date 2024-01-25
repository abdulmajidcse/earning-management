<?php

if (!function_exists('moneyFormat')) {
    function moneyFormat(float $number)
    {
        return 'USD ' . preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", round($number, 2));
    }
}